import { retrieveValueFromLocalStorage } from '@/common/local-storage';
import { Coords, Size } from '@/core/model';

export interface CanvasViewSettingsModel {
  canvasSize: Size;
  viewBoxSize: Size;
  zoomFactor: number;
  scrollPosition: Coords;
  filename: string;
  loadSample: boolean;
  autoSave: boolean;
}

// This canvas size is used to calc table sizes, etc...
// on the Canvas itself we will use a huge canvas in order to avoid having issues when zooming (Canvas_Max_Width and height...)
const CANVAS_SIZE = { width: 5000, height: 5000 };

export const USERSAVE_KEY = 'userSettings';

const savedSettingsObject = retrieveValueFromLocalStorage(USERSAVE_KEY);

const initialAutoSaveValue =
  savedSettingsObject && savedSettingsObject.autoSave !== undefined
    ? savedSettingsObject.autoSave
    : true;

export const createInitialSettings = (DEFAULT_ZOOM_FACTOR: number) => ({
  canvasSize: CANVAS_SIZE,
  viewBoxSize: { width: 0, height: 0 },
  zoomFactor: DEFAULT_ZOOM_FACTOR,
  scrollPosition: { x: 0, y: 0 },
  filename: '',
  loadSample: true,
  autoSave: initialAutoSaveValue,
});

export interface CanvasViewSettingsContextModel {
  canvasViewSettings: CanvasViewSettingsModel;
  setScrollPosition: (scrollPosition: Coords) => void;
  setCanvasSize: (canvasSize: Size) => void;
  setFilename: (filename: string) => void;
  zoomIn: () => void;
  zoomOut: () => void;
  setLoadSample: (loadSample: boolean) => void;
  setViewBoxSize: (viewBoxSize: Size) => void;
  setAutoSave: (autoSave: boolean) => void;
}
