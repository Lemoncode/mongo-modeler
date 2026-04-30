import { vi } from 'vitest';
import { TABLE_CONST } from '@/core/providers';
import { isOverLapping } from './database-relation-collection.business';

describe('database-relation-collection.business', () => {
  describe('isOverLapping function tests', () => {
    it('non-overlapping tables (before)', () => {
      vi.spyOn(TABLE_CONST, 'DEFAULT_TABLE_WIDTH', 'get').mockReturnValue(100);
      console.log(
        `
        Table A |====|
        Table B           |====|
        `
      );

      // Arrange
      const fromTableXCoord = 10;
      const toTableXCoord = 250;

      // Act
      const result = isOverLapping(fromTableXCoord, toTableXCoord);

      // Assert
      expect(result).toBeFalsy();
    });

    it('non-overlapping tables (after)', () => {
      vi.spyOn(TABLE_CONST, 'DEFAULT_TABLE_WIDTH', 'get').mockReturnValue(100);
      console.log(
        `
        Table A           |====|
        Table B |====|
        `
      );

      // Arrange
      const fromTableXCoord = 250;
      const toTableXCoord = 10;

      // Act
      const result = isOverLapping(fromTableXCoord, toTableXCoord);

      // Assert
      expect(result).toBeFalsy();
    });

    it('overlapping tables (partial)', () => {
      vi.spyOn(TABLE_CONST, 'DEFAULT_TABLE_WIDTH', 'get').mockReturnValue(100);
      console.log(
        `
        Table A |====|
        Table B    |====|
        `
      );

      // Arrange
      const fromTableXCoord = 10;
      const toTableXCoord = 60;

      // Act
      const result = isOverLapping(fromTableXCoord, toTableXCoord);

      // Assert
      expect(result).toBeTruthy();
    });

    it('overlapping tables (partial - reverse)', () => {
      vi.spyOn(TABLE_CONST, 'DEFAULT_TABLE_WIDTH', 'get').mockReturnValue(100);
      console.log(
        `
        Table A    |====|
        Table B |====|
        `
      );

      // Arrange
      const fromTableXCoord = 60;
      const toTableXCoord = 10;

      // Act
      const result = isOverLapping(fromTableXCoord, toTableXCoord);

      // Assert
      expect(result).toBeTruthy();
    });

    it('overlapping tables (full)', () => {
      vi.spyOn(TABLE_CONST, 'DEFAULT_TABLE_WIDTH', 'get').mockReturnValue(100);
      console.log(
        `
        Table A |====|
        Table B |====|
        `
      );

      // Arrange
      const fromTableXCoord = 10;
      const toTableXCoord = 10;

      // Act
      const result = isOverLapping(fromTableXCoord, toTableXCoord);

      // Assert
      expect(result).toBeTruthy();
    });

    it('overlapping tables (edge)', () => {
      vi.spyOn(TABLE_CONST, 'DEFAULT_TABLE_WIDTH', 'get').mockReturnValue(100);
      console.log(
        `
        Table A |====|
        Table B      |====|
        `
      );

      // Arrange
      const fromTableXCoord = 10;
      const toTableXCoord = 110;

      // Act
      const result = isOverLapping(fromTableXCoord, toTableXCoord);

      // Assert
      expect(result).toBeFalsy();
    });

    it('overlapping tables (edge - reverse)', () => {
      vi.spyOn(TABLE_CONST, 'DEFAULT_TABLE_WIDTH', 'get').mockReturnValue(100);
      console.log(
        `
        Table A      |====|
        Table B |====|
        `
      );

      // Arrange
      const fromTableXCoord = 110;
      const toTableXCoord = 10;

      // Act
      const result = isOverLapping(fromTableXCoord, toTableXCoord);

      // Assert
      expect(result).toBeFalsy();
    });
  });
});
