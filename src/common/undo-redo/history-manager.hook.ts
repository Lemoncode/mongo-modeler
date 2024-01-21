import { useState, useRef } from 'react';
import {
  addSnapshotToHistory,
  canUndo,
  canRedo,
  performUndo,
  performRedo,
} from './history-manager.business';

const MAX_HISTORY_LENGTH = 20;

export const useHistoryManager = <T>(initialState: T) => {
  const [currentState, setCurrentState] = useState<T>(initialState);
  const historyRef = useRef<T[]>([initialState]);
  const currentIndexRef = useRef<number>(0);

  const addSnapshot = (newState: T) => {
    const [newHistory, newIndex] = addSnapshotToHistory(
      historyRef.current,
      newState,
      currentIndexRef.current,
      MAX_HISTORY_LENGTH
    );
    historyRef.current = newHistory;
    currentIndexRef.current = newIndex;
    setCurrentState(newState);
  };

  const undo = () => {
    const newIndex = performUndo(currentIndexRef.current);
    if (newIndex !== currentIndexRef.current) {
      currentIndexRef.current = newIndex;
      setCurrentState(historyRef.current[newIndex]);
    }
  };

  const redo = () => {
    const newIndex = performRedo(
      currentIndexRef.current,
      historyRef.current.length
    );
    if (newIndex !== currentIndexRef.current) {
      currentIndexRef.current = newIndex;
      setCurrentState(historyRef.current[newIndex]);
    }
  };

  return {
    currentState,
    addSnapshot,
    getCurrentState: () => historyRef.current[currentIndexRef.current],
    undo,
    redo,
    canUndo: () => canUndo(currentIndexRef.current),
    canRedo: () => canRedo(currentIndexRef.current, historyRef.current.length),
  };
};
