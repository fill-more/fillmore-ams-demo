import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { GlobalTokens } from '@fillmore/ui';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalTokens />
    <App />
  </StrictMode>
);
