import { Coords, Size } from '@/core/model';
import React from 'react';

export interface CanvasViewSettingsModel {
  canvasSize: Size;
  zoomFactor: number;
  scrollPosition: Coords;
  filename: string;
  loadSample: boolean;
}

// This canvas size is used to calc table sizes, etc...
// on the Canvas itself we will use a huge canvas in order to avoid having issues when zooming (Canvas_Max_Width and height...)
const CANVAS_SIZE = { width: 5000, height: 5000 };

export const createInitialSettings = (DEFAULT_ZOOM_FACTOR: number) => ({
  canvasSize: CANVAS_SIZE,
  zoomFactor: DEFAULT_ZOOM_FACTOR,
  scrollPosition: { x: 0, y: 0 },
  filename: '',
  loadSample: true,
});

export interface CanvasViewSettingsContextModel {
  canvasViewSettings: CanvasViewSettingsModel;
  scrollPosition: Coords;
  filename: string;
  setScrollPosition: (scrollPosition: Coords) => void;
  setCanvasSize: (canvasSize: Size) => void;
  setFilename: (filename: string) => void;
  zoomIn: () => void;
  zoomOut: () => void;
  setLoadSample: (loadSample: boolean) => void;
  viewBoxSize: Size;
  setViewBoxSize: (viewBoxSize: Size) => void;
  canvasContainerRef: React.RefObject<HTMLDivElement>;
  setCanvasContainerRef: (
    containerRef: React.RefObject<HTMLDivElement>
  ) => React.RefObject<HTMLDivElement>;
}
