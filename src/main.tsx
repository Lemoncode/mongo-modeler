import App from './App.tsx';
import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import { ThemeProvider } from '@/core/providers/theme-provider/theme-provider.tsx';
import { CanvasSchemaProvider } from '@/core/providers/canvas-schema/canvas-schema.provider.tsx';
import {
  CanvasViewSettingsProvider,
  ModalDialogProvider,
} from './core/providers/index.ts';

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
