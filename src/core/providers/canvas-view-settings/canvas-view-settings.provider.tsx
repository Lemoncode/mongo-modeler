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

const USERSAVE_KEY = 'userSettings';

export const CanvasViewSettingsProvider: React.FC<Props> = props => {
  const { children } = props;
  const [canvasViewSettings, setCanvasViewSettings] =
    React.useState<CanvasViewSettingsModel>(
      createInitialSettings(DEFAULT_ZOOM_FACTOR)
    );
  const [scrollPosition, setScrollPosition] = React.useState<Coords>({
    x: 0,
    y: 0,
  });

  const [autoSave, setAutoSave] = React.useState<boolean>(true);

  React.useEffect(() => {
    const savedSettingsString = localStorage.getItem(USERSAVE_KEY);
    const savedSettings = savedSettingsString
      ? JSON.parse(savedSettingsString)
      : { autoSave: true };
    if (
      savedSettings &&
      typeof savedSettings === 'object' &&
      'autoSave' in savedSettings
    ) {
      setAutoSave(savedSettings.autoSave);
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem(USERSAVE_KEY, JSON.stringify({ autoSave }));
  }, [autoSave]);

  const zoomIn = () =>
    setCanvasViewSettings(canvasViewSettings => ({
      ...canvasViewSettings,
      zoomFactor: canvasViewSettings.zoomFactor * 0.9,
    }));

  const zoomOut = () =>
    setCanvasViewSettings(canvasViewSettings => ({
      ...canvasViewSettings,
      zoomFactor: canvasViewSettings.zoomFactor * 1.1,
    }));

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
        autoSave,
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
