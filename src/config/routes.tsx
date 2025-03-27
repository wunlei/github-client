import { createBrowserRouter, Navigate } from 'react-router';
import App from 'App/App';
import { RouteErrorBoundary } from 'components/ErrorBoundary';
import MainPage from 'pages/MainPage';
import NotFound from 'pages/NotFound/NotFound';
import RepositoryPage from 'pages/RepositoryPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        path: '/',
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
    path: '404',
    element: <NotFound />,
  },
  {
    path: '*',
    element: <Navigate to="/404" replace />,
    errorElement: <RouteErrorBoundary />,
  },
]);

export default router;
