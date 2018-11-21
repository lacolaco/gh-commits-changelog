export type GitHubCommit = {
  sha: string;
  commit: {
    message: string;
  };
  author: { login: string };
  committer: { login: string };
};

export type ConventionalCommit = {
  scope?: string;
  subject?: string;
  header?: string;
  footer?: string;
  type: string;
  hash: string;
  author: string;
  committer: string;
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
