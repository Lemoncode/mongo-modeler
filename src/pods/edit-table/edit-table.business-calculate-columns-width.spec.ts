import { calculateDBColumnsWidth } from './edit-table.business';

describe('Calculate columns Width', () => {
  it('should return the correct calculation of the widths', () => {
    // Arrange
    const percentages = [30, 70];
    const totalPixelWidth = 1000;

    // Act
    const result = calculateDBColumnsWidth(percentages, totalPixelWidth);

    // Assert
    expect(result).toEqual([300, 700]);
  });

  it('should return the same calculation widths', () => {
    // Arrange
    const percentages = [50, 50];
    const totalPixelWidth = 200;

    // Act
    const result = calculateDBColumnsWidth(percentages, totalPixelWidth);

    // Assert
    expect(result).toEqual([100, 100]);
  });
});
