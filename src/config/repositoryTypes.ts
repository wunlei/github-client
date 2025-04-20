export const repositoryTypes = ['all', 'public', 'forks', 'sources', 'member'] as const;

export type RepositoryTypes = (typeof repositoryTypes)[number];
