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

    test("custom commit template", async () => {
      const fixture: PullsListCommitsResponse = require("../test/fixtures/angularPullRequestCommits.json");
      const parsed = await main(
        fixture,
        context,
        {},
        {
          commitPartial: customCommitTemplate
        }
      );
      expect(parsed).toMatchSnapshot();
    });
  });
});

const customCommitTemplate = `
*{{#if scope}} **{{scope}}:**
{{~/if}} {{#if subject}}
  {{~subject}}
{{~else}}
  {{~header}}
{{~/if}} (@{{author}})

{{~!-- commit link --}} {{#if @root.linkReferences~}}
  ([{{hash}}](
  {{~#if @root.repository}}
    {{~#if @root.host}}
      {{~@root.host}}/
    {{~/if}}
    {{~#if @root.owner}}
      {{~@root.owner}}/
    {{~/if}}
    {{~@root.repository}}
  {{~else}}
    {{~@root.repoUrl}}
  {{~/if}}/
  {{~@root.commit}}/{{hash}}))
{{~else}}
  {{~hash}}
{{~/if}}

{{~!-- commit references --}}
{{~#if references~}}
  , closes
  {{~#each references}} {{#if @root.linkReferences~}}
    [
    {{~#if this.owner}}
      {{~this.owner}}/
    {{~/if}}
    {{~this.repository}}#{{this.issue}}](
    {{~#if @root.repository}}
      {{~#if @root.host}}
        {{~@root.host}}/
      {{~/if}}
      {{~#if this.repository}}
        {{~#if this.owner}}
          {{~this.owner}}/
        {{~/if}}
        {{~this.repository}}
      {{~else}}
        {{~#if @root.owner}}
          {{~@root.owner}}/
        {{~/if}}
          {{~@root.repository}}
        {{~/if}}
    {{~else}}
      {{~@root.repoUrl}}
    {{~/if}}/
    {{~@root.issue}}/{{this.issue}})
  {{~else}}
    {{~#if this.owner}}
      {{~this.owner}}/
    {{~/if}}
    {{~this.repository}}#{{this.issue}}
  {{~/if}}{{/each}}
{{~/if}}
`;
