import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { routes } from 'config/router';
import { useUserPageStore } from 'store/UserPageStore';

export const useInitUserPage = () => {
  const store = useUserPageStore();
  const { fetchUser, setUsername } = store;
  const { username } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!username) {
      navigate(routes.notFound);
      return;
    }

    setUsername(username);
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
