import { GitHubCommit, ConventionalCommit } from "./types";
const parser: {
  sync: (commits: string, options: Object) => any;
} = require("conventional-commits-parser");

export function createParser(parserOpts: Object) {
  return (commits: Array<GitHubCommit>) => {
    return commits.map(commit => {
      const conventionalCommit = parser.sync(commit.commit.message, parserOpts);

      return {
        ...conventionalCommit,
        hash: commit.sha,
        author: commit.author.login,
        committer: commit.committer.login
      };
    }) as Array<ConventionalCommit>;
  };
}
