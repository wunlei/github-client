export const repositoryTypes = ['all', 'public', 'private', 'forks', 'sources', 'member'] as const;

export type RepositoryTypes = (typeof repositoryTypes)[number];
