import { main, Context } from "./main";
import { PullRequestsGetCommitsResponse } from "@octokit/rest";

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
        version: "Release 2018-11-20"
      };
    });
    test("Work well with Angular commits", async () => {
      const fixture: PullRequestsGetCommitsResponse = require("../test/fixtures/angularPullRequestCommits.json");
      const parsed = await main(fixture, context);
      console.log(parsed);
      expect(parsed).toMatchSnapshot();
    });

    test("Work well with plain commits", async () => {
      const fixture: PullRequestsGetCommitsResponse = require("../test/fixtures/pullRequestCommits.json");
      const parsed = await main(fixture, context);
      expect(parsed).toMatchSnapshot();
    });
  });
});
