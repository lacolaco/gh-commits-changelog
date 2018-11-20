import { ConventionalCommit } from "./types";
const {
  processCommit,
  generate
}: {
  processCommit: (chunk: any, transform: Function, context: Object) => any;
  generate: (
    options: any,
    commits: ConventionalCommit[],
    context: Object,
    keyCommit: ConventionalCommit
  ) => string;
} = require("conventional-changelog-writer/lib/util");
import { format } from "date-fns";

export type WriterOptions = any;

export function createWriter(options: WriterOptions) {
  options = normalizeOptions(options);

  return (commits: ConventionalCommit[], context: any) => {
    context = {
      commit: "commits",
      issue: "issues",
      date: format(new Date(), "YYYY-MM-DD"),
      ...context
    };
    if (
      !context.linkReferences &&
      (context.repository || context.repoUrl) &&
      context.commit &&
      context.issue
    ) {
      context.linkReferences = true;
    }

    const processedCommits = commits
      .map(commit => {
        return processCommit(commit, options.transform, context);
      })
      .filter(commit => !!commit);
    console.log(processedCommits);
    return generate(options, processedCommits, context, commits[0]);
  };
}

function normalizeOptions(overrides: any) {
  const options = {
    commitsSort: "header",
    finalizeContext: (context: any) => {
      return context;
    },
    reverse: false,
    includeDetails: true,
    ignoreReverted: true,
    doFlush: true,
    ...overrides
  };
  return options;
}
