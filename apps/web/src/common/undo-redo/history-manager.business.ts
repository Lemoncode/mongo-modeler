// TODO Add Unit tests to this Undo/Redo helpers
// #162
// https://github.com/Lemoncode/mongo-modeler/issues/162
export function addSnapshotToHistory<T>(
  history: T[],
  newSnapshot: T,
  currentIndex: number,
  maxHistoryLength: number
): [T[], number] {
  let newHistory = history.slice(0, currentIndex + 1);
  newHistory.push(newSnapshot);

  if (newHistory.length > maxHistoryLength) {
    newHistory = newHistory.slice(1);
  } else {
    currentIndex++;
  }

  return [newHistory, currentIndex];
}

export function canUndo(currentIndex: number): boolean {
  return currentIndex > 0;
}

export function canRedo(currentIndex: number, historyLength: number): boolean {
  return currentIndex < historyLength - 1;
}

export function performUndo(currentIndex: number): number {
  return canUndo(currentIndex) ? currentIndex - 1 : currentIndex;
}

export function performRedo(
  currentIndex: number,
  historyLength: number
): number {
  return canRedo(currentIndex, historyLength) ? currentIndex + 1 : currentIndex;
}
