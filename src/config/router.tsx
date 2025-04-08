import { createBrowserRouter, Navigate } from 'react-router';
import App from 'App/App';
import { RouteErrorBoundary } from 'components/ErrorBoundary';
import MainPage from 'pages/MainPage';
import NotFound from 'pages/NotFound/NotFound';
import RepositoryPage from 'pages/RepositoryPage';
import { MainPageStoreProvider } from 'store/MainPageStore';
import { RepositoryPageStoreProvider } from 'store/RepositoryPageStore';

export const routes = {
  home: '/',
  notFound: '/404',
  repos: {
    mask: 'repos/:owner/:repo',
    create: (owner: string, repo: string) => `repos/${owner}/${repo}`,
  },
};

const router = createBrowserRouter([
  {
    path: routes.home,
    element: <App />,
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        path: routes.home,
        element: (
          <MainPageStoreProvider>
            <MainPage />
          </MainPageStoreProvider>
        ),
      },
    ],
  },
  {
    path: routes.repos.mask,

    element: (
      <RepositoryPageStoreProvider>
        <RepositoryPage />
      </RepositoryPageStoreProvider>
    ),

    errorElement: <RouteErrorBoundary />,
  },
  {
    path: routes.notFound,
    element: <NotFound />,
  },
  {
    path: '*',
    element: <Navigate to="/404" replace />,
    errorElement: <RouteErrorBoundary />,
  },
]);

export default router;
