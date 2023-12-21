export interface Size {
  width: number;
  height: number;
}

export interface CanvasViewSettingsModel {
  canvasSize: Size;
  zoomFactor: number;
}

export const ceateInitialSettings = () => ({
  canvasSize: { width: 2400, height: 2400 },
  zoomFactor: 1
});

export interface CanvasViewSettingsContextModel {
  canvasViewSettings: CanvasViewSettingsModel;
  zoomIn: () => void;
  zoomOut: () => void;
}
