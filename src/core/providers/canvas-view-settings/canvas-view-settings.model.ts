import { Size } from '@/core/model';

export interface CanvasViewSettingsModel {
  canvasSize: Size;
  zoomFactor: number;
}

export const createInitialSettings = () => ({
  canvasSize: { width: 2400, height: 2400 },
  zoomFactor: 1,
});

export interface CanvasViewSettingsContextModel {
  canvasViewSettings: CanvasViewSettingsModel;
  setCanvasSize: (canvasSize: Size) => void;
  zoomIn: () => void;
  zoomOut: () => void;
}
