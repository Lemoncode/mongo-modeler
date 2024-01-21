import { useState, useCallback, useRef } from 'react';
import { DatabaseSchemaVm } from '../providers';

export const useHistoryManager = (initialState: DatabaseSchemaVm) => {
  const [canvasSchema, setCanvasSchema] =
    useState<DatabaseSchemaVm>(initialState);

  // useRef para mantener el historial y el índice actual sin provocar renderizaciones
  const historyRef = useRef<DatabaseSchemaVm[]>([initialState]);
  const currentIndexRef = useRef<number>(0);

  const addSnapshot = (newSchema: DatabaseSchemaVm) => {
    const nextIndex = currentIndexRef.current + 1;
    const currentHistory = historyRef.current.slice(0, nextIndex);
    historyRef.current = [...currentHistory, newSchema];
    currentIndexRef.current = nextIndex;
  };

  const undo = useCallback(() => {
    const prevIndex = currentIndexRef.current - 1;
    if (prevIndex >= 0) {
      currentIndexRef.current = prevIndex;
      setCanvasSchema(historyRef.current[prevIndex]);
    }
  }, []);

  const redo = useCallback(() => {
    const nextIndex = currentIndexRef.current + 1;
    if (nextIndex < historyRef.current.length) {
      currentIndexRef.current = nextIndex;
      setCanvasSchema(historyRef.current[nextIndex]);
    }
  }, []);

  const canUndo = useCallback(() => {
    return currentIndexRef.current > 0;
  }, []);

  const canRedo = useCallback(() => {
    return currentIndexRef.current < historyRef.current.length - 1;
  }, []);

  const getCurrentState = () => historyRef.current[currentIndexRef.current];

  return {
    canvasSchema,
    addSnapshot,
    getCurrentState,
    undo,
    redo,
    canUndo,
    canRedo,
  };
};
