import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Force Update Timestamp: 2026-04-18 08:11:00 UTC
// Build ID: SMKPU_3D_GLASS_v2

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
