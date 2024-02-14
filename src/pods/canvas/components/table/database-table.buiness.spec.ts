import { calculateColumNameWidth } from './database-table.business';

describe('calculateColumNameWidth', () => {
  it('should return the correct calculation of column name', () => {
    // Arrange
    const percentages = [80, 10, 20, 10];
    const totalPixelWidth = 320;

    // Act
    const result = calculateColumNameWidth(percentages, totalPixelWidth);

    // Assert
    expect(result).toBe(200);
  });

  it('should return the correct calculation of column name', () => {
    // Arrange
    const percentages = [80, 10, 20, 10];
    const totalPixelWidth = 200;

    // Act
    const result = calculateColumNameWidth(percentages, totalPixelWidth);

    // Assert
    expect(result).toBe(80);
  });
});
