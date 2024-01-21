import { useState, useRef } from 'react';
import { DatabaseSchemaVm } from '../providers';

const MAX_HISTORY_LENGTH = 20; // Maximum limit for the history

export const useHistoryManager = (initialState: DatabaseSchemaVm) => {
  const [canvasSchema, setCanvasSchema] =
    useState<DatabaseSchemaVm>(initialState);

  // useRef to hold the historic and the actual index and avoid issues with async updates
  const historyRef = useRef<DatabaseSchemaVm[]>([initialState]);
  const currentIndexRef = useRef<number>(0);

  const addSnapshot = (newSchema: DatabaseSchemaVm) => {
    const nextIndex = Math.min(
      currentIndexRef.current + 1,
      MAX_HISTORY_LENGTH - 1
    );
    let currentHistory = historyRef.current.slice(0, nextIndex);

    if (currentHistory.length >= MAX_HISTORY_LENGTH) {
      // Remove the first element if the history exceeds the maximum size
      currentHistory = currentHistory.slice(1);
    }

    historyRef.current = [...currentHistory, newSchema];
    currentIndexRef.current = historyRef.current.length - 1;
  };

  const undo = () => {
    const prevIndex = currentIndexRef.current - 1;
    if (prevIndex >= 0) {
      currentIndexRef.current = prevIndex;
      setCanvasSchema(historyRef.current[prevIndex]);
    }
  };

  const redo = () => {
    const nextIndex = currentIndexRef.current + 1;
    if (nextIndex < historyRef.current.length) {
      currentIndexRef.current = nextIndex;
      setCanvasSchema(historyRef.current[nextIndex]);
    }
  };

  const canUndo = () => {
    return currentIndexRef.current > 0;
  };

  const canRedo = () => {
    return currentIndexRef.current < historyRef.current.length - 1;
  };

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
