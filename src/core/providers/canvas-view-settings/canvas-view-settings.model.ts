import { Coords, Size } from '@/core/model';

export interface CanvasViewSettingsModel {
  canvasSize: Size;
  zoomFactor: number;
  scrollPosition: Coords;
}

export const createInitialSettings = () => ({
  canvasSize: { width: 2400, height: 2400 },
  zoomFactor: 1,
  scrollPosition: { x: 0, y: 0 },
});

export interface CanvasViewSettingsContextModel {
  canvasViewSettings: CanvasViewSettingsModel;
  scrollPosition: Coords;
  setScrollPosition: (scrollPosition: Coords) => void;
  setCanvasSize: (canvasSize: Size) => void;
  zoomIn: () => void;
  zoomOut: () => void;
}
