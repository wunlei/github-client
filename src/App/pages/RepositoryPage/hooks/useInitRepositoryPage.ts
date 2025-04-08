import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { routes } from 'config/router';
import { useRepositoryPageStore } from 'store/RepositoryPageStore';

export const useInitRepositoryPage = () => {
  const store = useRepositoryPageStore();
  const { setOrgName, setRepoName, fetchReadme, fetchRepo } = store;
  const { owner, repo } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!owner || !repo) {
      navigate(routes.notFound);
      return;
    }

    setOrgName(owner);
    setRepoName(repo);

    fetchRepo();
    fetchReadme();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
