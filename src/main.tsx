import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from 'App/App';
import 'styles/normalize.scss';
import 'styles/lang-colors.scss';
import 'styles/github-markdown.scss';
import 'styles/index.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
