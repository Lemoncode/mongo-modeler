// historyManager.ts

import { DatabaseSchemaVm } from '../providers';

let history: DatabaseSchemaVm[] = [];
let currentIndex = -1;

export function initializeHistory(initialState: DatabaseSchemaVm) {
  history = [initialState];
  currentIndex = 0;
}

export function getCurrentState(): DatabaseSchemaVm {
  return history[currentIndex];
}

export function canUndoLogic(): boolean {
  return currentIndex > 0;
}

export function canRedoLogic(): boolean {
  return currentIndex < history.length - 1;
}

export function undo(): DatabaseSchemaVm | null {
  if (canUndoLogic()) {
    currentIndex--;
    return getCurrentState();
  }
  return null;
}

export function redo(): DatabaseSchemaVm | null {
  if (canRedoLogic()) {
    currentIndex++;
    return getCurrentState();
  }
  return null;
}

export function addSnapshot(newState: DatabaseSchemaVm) {
  if (canRedoLogic()) {
    history = history.slice(0, currentIndex + 1);
  }
  history.push(newState);
  currentIndex++;
}
