export type GitHubCommit = {
  sha: string;
  commit: {
    message: string;
  };
};

export type ConventionalCommit = {
  scope?: string;
  subject?: string;
  header?: string;
  footer?: string;
  type: string;
  hash: string;
  mentions: string[];
  references: Array<{
    owner?: string;
    issue?: string;
    repository?: string;
  }>;
};

export type ConventionalCommitGroup = {
  title?: string;
  commits: ConventionalCommit[];
};
