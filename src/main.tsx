import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import 'styles/normalize.scss';
import 'styles/lang-colors.scss';
import 'styles/github-markdown.scss';
import 'styles/index.scss';
import router from 'config/routes';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
