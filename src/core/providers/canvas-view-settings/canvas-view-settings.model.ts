import { Coords, Size } from '@/core/model';

export interface CanvasViewSettingsModel {
  canvasSize: Size;
  zoomFactor: number;
  scrollPosition: Coords;
  filename: string;
}

export const createInitialSettings = () => ({
  canvasSize: { width: 2400, height: 2400 },
  zoomFactor: 1,
  scrollPosition: { x: 0, y: 0 },
  filename: '',
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
}
