import React from 'react';
import {
  CanvasViewSettingsModel,
  createInitialSettings,
} from './canvas-view-settings.model';
import { CanvasViewSettingsContext } from './canvas-view-settings.context';
import { Coords, Size } from '@/core/model';

interface Props {
  children: React.ReactNode;
}

export const CanvasViewSettingsProvider: React.FC<Props> = props => {
  const { children } = props;
  const [canvasViewSettings, setCanvasViewSettings] =
    React.useState<CanvasViewSettingsModel>(createInitialSettings());
  const [scrollPosition, setScrollPosition] = React.useState<Coords>({
    x: 0,
    y: 0,
  });

  const zoomIn = () => {
    const maxZoomFactor = 2; // Factor de zoom máximo permitido
    const zoomFactorIncrement = 0.1; // Incremento del factor de zoom
    const newZoomFactor = Math.min(
      canvasViewSettings.zoomFactor * (1 + zoomFactorIncrement),
      maxZoomFactor
    );

    // Calcula el cambio en el tamaño del lienzo de manera más moderada
    const zoomFactorChange = newZoomFactor / canvasViewSettings.zoomFactor;
    const newHeight =
      canvasViewSettings.canvasSize.height * Math.sqrt(zoomFactorChange);
    const newWidth =
      canvasViewSettings.canvasSize.width * Math.sqrt(zoomFactorChange);

    setCanvasViewSettings(canvasViewSettings => ({
      ...canvasViewSettings,
      zoomFactor: newZoomFactor,
      canvasSize: {
        height: newHeight,
        width: newWidth,
      },
    }));
  };

  const zoomOut = () => {
    const minZoomFactor = 0.5; // Factor de zoom mínimo permitido
    const zoomFactorDecrement = 0.1; // Decremento del factor de zoom
    const newZoomFactor = Math.max(
      canvasViewSettings.zoomFactor * (1 - zoomFactorDecrement),
      minZoomFactor
    );

    // Calcula el cambio en el tamaño del lienzo de manera más moderada
    const zoomFactorChange = newZoomFactor / canvasViewSettings.zoomFactor;
    const newHeight =
      canvasViewSettings.canvasSize.height / Math.sqrt(zoomFactorChange);
    const newWidth =
      canvasViewSettings.canvasSize.width / Math.sqrt(zoomFactorChange);

    setCanvasViewSettings(canvasViewSettings => ({
      ...canvasViewSettings,
      zoomFactor: newZoomFactor,
      canvasSize: {
        height: newHeight,
        width: newWidth,
      },
    }));
  };

  const setCanvasSize = (canvasSize: Size) => {
    setCanvasViewSettings(canvasViewSettings => ({
      ...canvasViewSettings,
      canvasSize,
    }));
  };

  const setFilename = (filename: string) => {
    setCanvasViewSettings(canvasViewSettings => ({
      ...canvasViewSettings,
      filename,
    }));
  };

  const setLoadSample = (loadSample: boolean) => {
    setCanvasViewSettings(canvasViewSettings => ({
      ...canvasViewSettings,
      loadSample,
    }));
  };

  return (
    <CanvasViewSettingsContext.Provider
      value={{
        canvasViewSettings,
        scrollPosition,
        filename: canvasViewSettings.filename,
        zoomIn,
        zoomOut,
        setCanvasSize,
        setScrollPosition,
        setFilename,
        setLoadSample,
      }}
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
