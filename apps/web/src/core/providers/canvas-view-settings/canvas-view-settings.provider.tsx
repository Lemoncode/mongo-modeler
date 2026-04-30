import React from 'react';
import {
  CanvasViewSettingsModel,
  USERSAVE_KEY,
  createInitialSettings,
} from './canvas-view-settings.model';
import { CanvasViewSettingsContext } from './canvas-view-settings.context';
import { Coords, Size } from '@/core/model';
import { saveValueToLocalStorage } from '@/common/local-storage';

interface Props {
  children: React.ReactNode;
}

const DEFAULT_MOBILE_ZOOM_FACTOR = 7;
const DEFAULT_TABLET_ZOOM_FACTOR = 5.8;
const DEFAULT_DESKTOP_ZOOM_FACTOR = 4.2;

const mediaQueries: { [key: string]: MediaQueryList } = {
  mobileMq: window.matchMedia('(max-device-width: 767px)'),
  tabletMq: window.matchMedia(
    '(min-device-width: 768px) and (max-width:1023px)'
  ),
  desktopMq: window.matchMedia('(min-device-width: 1024px)'),
};
const isMobile = mediaQueries.mobileMq.matches;
const isTablet = mediaQueries.tabletMq.matches;

const DEFAULT_ZOOM_FACTOR = isMobile
  ? DEFAULT_MOBILE_ZOOM_FACTOR
  : isTablet
    ? DEFAULT_TABLET_ZOOM_FACTOR
    : DEFAULT_DESKTOP_ZOOM_FACTOR;

export const CanvasViewSettingsProvider: React.FC<Props> = props => {
  const { children } = props;
  const [canvasViewSettings, setCanvasViewSettings] =
    React.useState<CanvasViewSettingsModel>(
      createInitialSettings(DEFAULT_ZOOM_FACTOR)
    );

  const setScrollPosition = (scrollPosition: Coords) => {
    setCanvasViewSettings(canvasViewSettings => ({
      ...canvasViewSettings,
      scrollPosition: scrollPosition,
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

  const zoomIn = () => {
    setCanvasViewSettings(canvasViewSettings => ({
      ...canvasViewSettings,
      zoomFactor: canvasViewSettings.zoomFactor * 0.9,
    }));
  };

  const zoomOut = () => {
    setCanvasViewSettings(canvasViewSettings => ({
      ...canvasViewSettings,
      zoomFactor: canvasViewSettings.zoomFactor * 1.1,
    }));
  };

  const setLoadSample = (loadSample: boolean) => {
    setCanvasViewSettings(canvasViewSettings => ({
      ...canvasViewSettings,
      loadSample,
    }));
  };

  const setViewBoxSize = (viewBoxSize: Size) => {
    setCanvasViewSettings(canvasViewSettings => ({
      ...canvasViewSettings,
      viewBoxSize: viewBoxSize,
    }));
  };

  const setAutoSave = (autoSave: boolean) => {
    saveValueToLocalStorage(USERSAVE_KEY, {
      autoSave: canvasViewSettings.autoSave,
    });
    setCanvasViewSettings(canvasViewSettings => ({
      ...canvasViewSettings,
      autoSave,
    }));
  };

  return (
    <CanvasViewSettingsContext.Provider
      value={{
        canvasViewSettings,
        setScrollPosition,
        setCanvasSize,
        setFilename,
        zoomIn,
        zoomOut,
        setLoadSample,
        setViewBoxSize,
        setAutoSave,
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
