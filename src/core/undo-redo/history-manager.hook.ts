import { useState, useRef } from 'react';
import { DatabaseSchemaVm } from '../providers';
import {
  addSnapshotToHistory,
  canUndo,
  canRedo,
  performUndo,
  performRedo,
} from './history-manager.business';
const MAX_HISTORY_LENGTH = 20;

export const useHistoryManager = (initialState: DatabaseSchemaVm) => {
  const [canvasSchema, setCanvasSchema] =
    useState<DatabaseSchemaVm>(initialState);
  const historyRef = useRef<DatabaseSchemaVm[]>([initialState]);
  const currentIndexRef = useRef<number>(0);

  const addSnapshot = (newSchema: DatabaseSchemaVm) => {
    const [newHistory, newIndex] = addSnapshotToHistory(
      historyRef.current,
      newSchema,
      currentIndexRef.current,
      MAX_HISTORY_LENGTH
    );
    historyRef.current = newHistory;
    currentIndexRef.current = newIndex;
    setCanvasSchema(newSchema);
  };

  const undo = () => {
    const newIndex = performUndo(currentIndexRef.current);
    if (newIndex !== currentIndexRef.current) {
      currentIndexRef.current = newIndex;
      setCanvasSchema(historyRef.current[newIndex]);
    }
  };

  const redo = () => {
    const newIndex = performRedo(
      currentIndexRef.current,
      historyRef.current.length
    );
    if (newIndex !== currentIndexRef.current) {
      currentIndexRef.current = newIndex;
      setCanvasSchema(historyRef.current[newIndex]);
    }
  };

  return {
    canvasSchema,
    addSnapshot,
    getCurrentState: () => historyRef.current[currentIndexRef.current],
    undo,
    redo,
    canUndo: () => canUndo(currentIndexRef.current),
    canRedo: () => canRedo(currentIndexRef.current, historyRef.current.length),
  };
};
