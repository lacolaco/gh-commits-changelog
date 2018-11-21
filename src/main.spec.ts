import { main, Context } from "./main";
import { PullsListCommitsResponse } from "@octokit/rest";

describe("main", () => {
  describe("integration tests", () => {
    let context: Context;
    beforeEach(() => {
      context = {
        host: "https://github.com",
        owner: "angular",
        repository: "angular",
        currentTag: "e37f23f52c0d46126c3d15f6dac2e573c838a353",
        previousTag: "c69fff15c9e001bd636b180758f1102d338564fb",
        version: "Release 2018-11-20",
        date: "2018-11-11"
      };
    });
    test("Work well with Angular commits", async () => {
      const fixture: PullsListCommitsResponse = require("../test/fixtures/angularPullRequestCommits.json");
      const parsed = await main(fixture, context);
      expect(parsed).toMatchSnapshot();
    });

    test("Work well with plain commits", async () => {
      const fixture: PullsListCommitsResponse = require("../test/fixtures/pullRequestCommits.json");
      const parsed = await main(fixture, context);
      expect(parsed).toMatchSnapshot();
    });
  });
});
