const mergeConfig = require("conventional-changelog-core/lib/merge-config");
const angular = require("conventional-changelog-angular");
import { createParser } from "./parser";
import { createWriter } from "./writer";
import { GitHubCommit } from "./types";

export type Context = {
  version?: string;
  previousTag?: string;
  currentTag?: string;
  host?: string;
  owner?: string;
  repository?: string;
  repoUrl?: string;
  title?: string;
  date?: string;
};

export async function main(ghCommits: Array<GitHubCommit>, context: Context) {
  const config = await mergeConfig(
    {
      config: angular
    },
    {
      ...context
    }
  );
  const parser = createParser(config.parserOpts);
  const writer = createWriter(config.writerOpts);
  const changelog = writer(parser(ghCommits), config.context);
  return await changelog;
}
