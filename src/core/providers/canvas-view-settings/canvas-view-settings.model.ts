import { Coords, Size } from '@/core/model';

export interface CanvasViewSettingsModel {
  canvasSize: Size;
  zoomFactor: number;
  scrollPosition: Coords;
  filename: string;
  loadSample: boolean;
}

export const createInitialSettings = () => ({
  canvasSize: { width: 2400, height: 2400 },
  zoomFactor: 8.5,
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
}
