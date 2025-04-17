export const routes = {
  home: '/',
  notFound: '/404',
  repos: {
    mask: '/repos/:owner/:repo',
    create: (owner: string, repo: string) => `/repos/${owner}/${repo}`,
  },
  users: {
    mask: '/users',
  },
  user: {
    mask: '/user/:username',
    create: (username: string) => `/user/${username}`,
  },
};
