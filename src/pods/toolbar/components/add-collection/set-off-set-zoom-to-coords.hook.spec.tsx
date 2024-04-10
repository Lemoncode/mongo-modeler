import { Coords } from '@/core/model';
import { useOffsetZoomToCoords } from './set-off-set-zoom-to-coords.hook';
import {
  CANVAS_MAX_HEIGHT,
  CANVAS_MAX_WIDTH,
  CanvasViewSettingsContext,
} from '@/core/providers/';
import { renderHook } from '@testing-library/react';
import { CanvasViewSettingsContextModel } from '@/core/providers/canvas-view-settings/canvas-view-settings.model';

describe('useOffsetZoomToCoords', () => {
  it('should return correct coordinates after applying offset zoom', () => {
    // Arrange
    const inputCoords: Coords = { x: 10, y: 10 };

    const initialContextState: CanvasViewSettingsContextModel = {
      canvasViewSettings: {
        canvasSize: { width: 5000, height: 5000 },
        zoomFactor: 2,
        scrollPosition: { x: 0, y: 0 },
        filename: '',
        loadSample: true,
      },
      scrollPosition: { x: 0, y: 0 },
      filename: '',
      viewBoxSize: { width: 20000, height: 20000 },
      zoomIn: () => {},
      zoomOut: () => {},
      setCanvasSize: () => {},
      setScrollPosition: () => {},
      setFilename: () => {},
      setLoadSample: () => {},
      setViewBoxSize: () => {},
      autoSave: false,
      setAutoSave: () => {},
    };

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <CanvasViewSettingsContext.Provider value={initialContextState}>
        {children}
      </CanvasViewSettingsContext.Provider>
    );

    // Act
    const { result } = renderHook(
      () => useOffsetZoomToCoords({ x: inputCoords.x, y: inputCoords.y }),
      { wrapper }
    );

    const MULTIPLIER_TO_SET_OFFSET_TO_CANVAS_DIMENSION_WIDTH =
      CANVAS_MAX_WIDTH /
      initialContextState.canvasViewSettings.canvasSize.width;
    const MULTIPLIER_TO_SET_OFFSET_TO_CANVAS_DIMENSION_HEIGHT =
      CANVAS_MAX_WIDTH /
      initialContextState.canvasViewSettings.canvasSize.height;
    const adjustedWidth =
      CANVAS_MAX_WIDTH / initialContextState.viewBoxSize.width;
    const adjustedHeight =
      CANVAS_MAX_HEIGHT / initialContextState.viewBoxSize.height;

    const expectedCoordX =
      (inputCoords.x /
        (initialContextState.canvasViewSettings.zoomFactor * adjustedWidth) /
        adjustedWidth) *
      MULTIPLIER_TO_SET_OFFSET_TO_CANVAS_DIMENSION_WIDTH;
    const expectedCoordY =
      (inputCoords.y /
        (initialContextState.canvasViewSettings.zoomFactor * adjustedHeight) /
        adjustedHeight) *
      MULTIPLIER_TO_SET_OFFSET_TO_CANVAS_DIMENSION_HEIGHT;

    // Assert
    expect({ x: result.current.x, y: result.current.y }).toEqual({
      x: expectedCoordX,
      y: expectedCoordY,
    });
  });
});
