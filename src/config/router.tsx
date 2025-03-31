import { createBrowserRouter, Navigate } from 'react-router';
import App from 'App/App';
import { RouteErrorBoundary } from 'components/ErrorBoundary';
import MainPage from 'pages/MainPage';
import NotFound from 'pages/NotFound/NotFound';
import RepositoryPage from 'pages/RepositoryPage';

export const ROUTES = {
  home: '/',
  notFound: '/404',
  repos: '/repos',
};

const router = createBrowserRouter([
  {
    path: ROUTES.home,
    element: <App />,
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        path: ROUTES.home,
        element: <MainPage />,
      },
    ],
  },
  {
    path: 'repos/:owner/:repo',
    element: <RepositoryPage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: ROUTES.notFound,
    element: <NotFound />,
  },
  {
    path: '*',
    element: <Navigate to="/404" replace />,
    errorElement: <RouteErrorBoundary />,
  },
]);

export default router;
