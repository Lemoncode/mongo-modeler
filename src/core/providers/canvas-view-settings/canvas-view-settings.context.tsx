import React from 'react';
import {
  CanvasViewSettingsContextModel,
  ceateInitialSettings
} from './canvas-view-settings.model';

export const CanvasViewSettingsContext =
  React.createContext<CanvasViewSettingsContextModel>({
    canvasViewSettings: ceateInitialSettings(),
    zoomIn: () => {},
    zoomOut: () => {}
  });
