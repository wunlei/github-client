import { createBrowserRouter, Navigate } from 'react-router';
import App from 'App/App';
import UserPage from 'App/pages/UserPage/UserPage';
import UserSearchPage from 'App/pages/UserSearchPage';
import { RouteErrorBoundary } from 'components/ErrorBoundary';
import { routes } from 'config/router';
import MainPage from 'pages/MainPage';
import NotFound from 'pages/NotFound/NotFound';
import RepositoryPage from 'pages/RepositoryPage';
import { MainPageStoreProvider } from 'store/MainPageStore';
import { RepositoryPageStoreProvider } from 'store/RepositoryPageStore';
import { UserPageStoreProvider } from 'store/UserPageStore';
import { UserSearchPageStoreProvider } from 'store/UserSearchPageStore';

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
    path: routes.users.mask,
    element: (
      <UserSearchPageStoreProvider>
        <UserSearchPage />
      </UserSearchPageStoreProvider>
    ),
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: routes.user.mask,
    element: (
      <UserPageStoreProvider>
        <UserPage />
      </UserPageStoreProvider>
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
