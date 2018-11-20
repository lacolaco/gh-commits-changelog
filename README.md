# gh-commits-changelog

Util for GitHub API + conventional-changelog.

**Experimental and unstable**

```js
const ghCommitsChangelog = require('@lacolaco/gh-commits-changelog');
const octokit = require('@octokit/rest')();

const { data } = await octokit.pulls.listCommits(params);
const changelog = await ghCommitsChangelog(data, {
  host: 'https://github.com',
  owner,
  repository,
  currentTag: 'xxxx', // base hash
  previousTag: 'xxxx', // head hash
  version: 'version name'
});
```

LICENSE: MIT
