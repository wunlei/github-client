import { createBrowserRouter, Navigate } from 'react-router';
import App from 'App/App';
import { RouteErrorBoundary } from 'components/ErrorBoundary';
import { routes } from 'config/router';
import MainPage from 'pages/MainPage';
import NotFound from 'pages/NotFound/NotFound';
import RepositoryPage from 'pages/RepositoryPage';
import { MainPageStoreProvider } from 'store/MainPageStore';
import { RepositoryPageStoreProvider } from 'store/RepositoryPageStore';

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
