import React from 'react';
import {
  CanvasViewSettingsModel,
  ceateInitialSettings
} from './canvas-view-settings.model';
import { CanvasViewSettingsContext } from './canvas-view-settings.context';

interface Props {
  children: React.ReactNode;
}

export const CanvasViewSettingsProvider: React.FC<Props> = props => {
  const { children } = props;
  const [canvasViewSettings, setCanvasViewSettings] =
    React.useState<CanvasViewSettingsModel>(ceateInitialSettings());

  const zoomIn = () =>
    setCanvasViewSettings({
      ...canvasViewSettings,
      zoomFactor: canvasViewSettings.zoomFactor * 0.9
    });

  const zoomOut = () =>
    setCanvasViewSettings({
      ...canvasViewSettings,
      zoomFactor: canvasViewSettings.zoomFactor * 1.1
    });

  return (
    <CanvasViewSettingsContext.Provider
      value={{ canvasViewSettings, zoomIn, zoomOut }}
    >
      {children}
    </CanvasViewSettingsContext.Provider>
  );
};

// eslint se queja de que se exportan dos cosas en el archivo, el provider y esto
// y como esto es un custom hook, lo dejo aquí o lo muevo a un archivo canvas-view-settings.hook.tsx,
export const useCanvasViewSettingsContext = () =>
  React.useContext(CanvasViewSettingsContext);
