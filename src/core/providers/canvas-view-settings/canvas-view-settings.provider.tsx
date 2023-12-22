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

export const useCanvasViewSettingsContext = () => {
  const context = React.useContext(CanvasViewSettingsContext);
  if (context === null) {
    throw 'useCanvasViewSettingsContext: looks like you have forgotten to add the provider on top of the app :)';
  }

  return context;
};
