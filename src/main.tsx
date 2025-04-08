import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import router from 'config/router';
import 'config/configureMobX';
import 'styles/normalize.scss';
import 'styles/lang-colors.scss';
import 'styles/github-markdown.scss';
import 'styles/index.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
