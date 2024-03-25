import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { ThemeProvider } from './core/providers/theme-provider/theme-provider.tsx';
import './App.css';
import { DeviceProvider } from './core/providers/index.ts';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <DeviceProvider>
        <App />
      </DeviceProvider>
    </ThemeProvider>
  </React.StrictMode>
);
