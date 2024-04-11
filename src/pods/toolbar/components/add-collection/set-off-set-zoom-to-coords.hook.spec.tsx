import { Coords } from '@/core/model';
import { useOffsetZoomToCoords } from './set-off-set-zoom-to-coords.hook';
import { CanvasViewSettingsContext } from '@/core/providers/';
import { renderHook } from '@testing-library/react';
import { CanvasViewSettingsContextModel } from '@/core/providers/canvas-view-settings/canvas-view-settings.model';

describe('useOffsetZoomToCoords', () => {
  it('should return correct coordinates after applying offset zoom (random normal value #1)', () => {
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

    const expected = { x: 20, y: 20 };

    // Assert
    expect({ x: result.current.x, y: result.current.y }).toEqual({
      x: expected.x,
      y: expected.y,
    });
  });
  it('should return correct coordinates after applying offset zoom (random normal value #2)', () => {
    // Arrange
    const inputCoords: Coords = { x: 200, y: 120 };

    const initialContextState: CanvasViewSettingsContextModel = {
      canvasViewSettings: {
        canvasSize: { width: 10000, height: 10000 },
        zoomFactor: 2,
        scrollPosition: { x: 0, y: 0 },
        filename: '',
        loadSample: true,
      },
      scrollPosition: { x: 0, y: 0 },
      filename: '',
      viewBoxSize: { width: 25000, height: 15000 },
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

    const expected = { x: 312.5, y: 67.5 };
    // Assert
    expect({ x: result.current.x, y: result.current.y }).toEqual({
      x: expected.x,
      y: expected.y,
    });
  });
  it('should return correct coordinates after applying offset zoom (random normal value #3)', () => {
    // Arrange
    const inputCoords: Coords = { x: 200, y: 120 };

    const initialContextState: CanvasViewSettingsContextModel = {
      canvasViewSettings: {
        canvasSize: { width: 300, height: 100 },
        zoomFactor: 5,
        scrollPosition: { x: 0, y: 0 },
        filename: '',
        loadSample: true,
      },
      scrollPosition: { x: 0, y: 0 },
      filename: '',
      viewBoxSize: { width: 2000, height: 5000 },
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

    const expected = { x: 26.66666666666667, y: 300 };
    // Assert
    expect({ x: result.current.x, y: result.current.y }).toEqual({
      x: expected.x,
      y: expected.y,
    });
  });
  it('should return correct coordinates after applying offset zoom (extreme value #1)', () => {
    // Arrange
    const inputCoords: Coords = { x: 612365, y: 5120002 };

    const initialContextState: CanvasViewSettingsContextModel = {
      canvasViewSettings: {
        canvasSize: {
          width: Number.MAX_SAFE_INTEGER,
          height: Number.MAX_SAFE_INTEGER,
        },
        zoomFactor: 5,
        scrollPosition: { x: 0, y: 0 },
        filename: '',
        loadSample: true,
      },
      scrollPosition: { x: 0, y: 0 },
      filename: '',
      viewBoxSize: {
        width: Number.MAX_SAFE_INTEGER,
        height: Number.MAX_SAFE_INTEGER,
      },
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

    const expected = { x: 55156935716294670, y: 461168781986723840 };
    // Assert
    expect({ x: result.current.x, y: result.current.y }).toEqual({
      x: expected.x,
      y: expected.y,
    });
  });
  it('should return correct coordinates after applying offset zoom (extreme value #2)', () => {
    // Arrange
    const inputCoords: Coords = { x: 0, y: 0 };

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

    const expected = { x: 0, y: 0 };
    // Assert
    expect({ x: result.current.x, y: result.current.y }).toEqual({
      x: expected.x,
      y: expected.y,
    });
  });
});
