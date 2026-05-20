import {
  canUndo,
  canRedo,
  performUndo,
  performRedo,
} from './history-manager.business';

describe('common/undo-redo/history-manager.business', () => {
  describe('canUndo', () => {
    it('should return true when current index is higher than zero', () => {
      // Arrange
      const currentIndex: number = 1;
      const expectedResult: boolean = true;
      // Act
      const result = canUndo(currentIndex);
      // Assert
      expect(result).toEqual(expectedResult);
    });

    it('should return false when current index equals zero', () => {
      // Arrange
      const currentIndex: number = 0;
      const expectedResult: boolean = false;
      // Act
      const result = canUndo(currentIndex);
      // Assert
      expect(result).toEqual(expectedResult);
    });

    it('should return false when current index is lower than zero', () => {
      // Arrange
      const currentIndex: number = -1;
      const expectedResult: boolean = false;
      // Act
      const result = canUndo(currentIndex);
      // Assert
      expect(result).toEqual(expectedResult);
    });
  });

  describe('canRedo', () => {
    it('should return true when current index is lower than history length minus 1', () => {
      // Arrange
      const currentIndex: number = 1;
      const historyLength: number = 3;
      const expectedResult: boolean = true;
      // Act
      const result = canRedo(currentIndex, historyLength);
      // Assert
      expect(result).toEqual(expectedResult);
    });

    it('should return false when current index equals history length minus 1', () => {
      // Arrange
      const currentIndex: number = 1;
      const historyLength: number = 2;
      const expectedResult: boolean = false;
      // Act
      const result = canRedo(currentIndex, historyLength);
      // Assert
      expect(result).toEqual(expectedResult);
    });

    it('should return false when current index is higher than history length minus 1', () => {
      // Arrange
      const currentIndex: number = 2;
      const historyLength: number = 2;
      const expectedResult: boolean = false;
      // Act
      const result = canRedo(currentIndex, historyLength);
      // Assert
      expect(result).toEqual(expectedResult);
    });
  });

  describe('performUndo', () => {
    it('should return current index minus 1 when canUndo function with current index as parameter returns true', () => {
      // Arrange
      const currentIndex: number = 1;
      const expectedResult: number = 0;
      // Act
      const result = performUndo(currentIndex);
      // Assert
      expect(result).toEqual(expectedResult);
    });

    it('should return current index when canUndo function with current index as parameter returns false', () => {
      // Arrange
      const currentIndex: number = 0;
      const expectedResult: number = 0;
      // Act
      const result = performUndo(currentIndex);
      // Assert
      expect(result).toEqual(expectedResult);
    });
  });

  describe('performRedo', () => {
    it('should return current index plus 1 when canRedo function with current index and history length as parameters returns true', () => {
      // Arrange
      const currentIndex = 1;
      const historyLength: number = 3;
      const expectedResult: number = 2;
      // Act
      const result = performRedo(currentIndex, historyLength);
      // Assert
      expect(result).toEqual(expectedResult);
    });

    it('should return current index when canRedo function with current index and history length as parameters returns false', () => {
      // Arrange
      const currentIndex = 1;
      const historyLength: number = 2;
      const expectedResult: number = 1;
      // Act
      const result = performRedo(currentIndex, historyLength);
      // Assert
      expect(result).toEqual(expectedResult);
    });
  });
});
