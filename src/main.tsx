import React from 'react';
import ReactDOM from 'react-dom/client';

import './app.css';
import App from './App.tsx';

import {
  ThemeProvider,
  CanvasViewSettingsProvider,
  CanvasSchemaProvider,
  ModalDialogProvider,
} from '@/core/providers';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <CanvasViewSettingsProvider>
        <CanvasSchemaProvider>
          <ModalDialogProvider>
            <App />
          </ModalDialogProvider>
        </CanvasSchemaProvider>
      </CanvasViewSettingsProvider>
    </ThemeProvider>
  </React.StrictMode>
);
