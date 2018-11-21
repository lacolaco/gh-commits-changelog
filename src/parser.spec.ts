import { createParser } from "./parser";
import { PullsListCommitsResponse } from "@octokit/rest";

describe("parser", () => {
  describe("integration tests", () => {
    test("Work well with Angular commits", async () => {
      const parser = createParser({});
      const fixture: PullsListCommitsResponse = require("../test/fixtures/angularPullRequestCommits.json");
      const parsed = parser(fixture);
      expect(parsed).toMatchSnapshot();
    });

    test("Work well with plain commits", () => {
      const parser = createParser({});
      const fixture: PullsListCommitsResponse = require("../test/fixtures/pullRequestCommits.json");
      const parsed = parser(fixture);
      expect(parsed).toMatchSnapshot();
    });
  });
});
