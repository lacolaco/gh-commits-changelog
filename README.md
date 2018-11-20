# gh-commits-changelog

Util for GitHub API + conventional-changelog.

**Experimental and unstable**

```js
const ghCommitsChangelog = require('@lacolaco/gh-commits-changelog');
const Octokit = require('@octokit/rest');

const github = new Octokit();

github.pullRequests.getCommits(params).then(async ({ data }) => {
  const changelog = await ghCommitsChangelog(data, {
    host: 'https://github.com',
    owner,
    repository,
    currentTag: 'xxxx', // base hash
    previousTag: 'xxxx', // head hash
    version: 'version name'
  });
});
```

LICENSE: MIT
