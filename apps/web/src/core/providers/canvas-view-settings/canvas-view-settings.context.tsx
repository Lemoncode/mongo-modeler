import React from 'react';
import { CanvasViewSettingsContextModel } from './canvas-view-settings.model';

export const CanvasViewSettingsContext =
  React.createContext<CanvasViewSettingsContextModel | null>(null);
