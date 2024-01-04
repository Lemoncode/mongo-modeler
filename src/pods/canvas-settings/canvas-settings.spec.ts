import { formValidation } from './canvas-settings.validation';

describe('formValidation', () => {
  it('should return an error when width is not a number', async () => {
    // Arrange
    const values = { width: 'a', height: 500 };
    // Act
    const result = await formValidation.validateForm(values);
    // Assert
    expect((result as any)['width']).toBe('Must be a number');
  });

  it('should return an error when height is not a number', async () => {
    // Arrange
    const values = { width: 500, height: 'a' };
    // Act
    const result = await formValidation.validateForm(values);
    // Assert
    expect((result as any)['height']).toBe('Must be a number');
  });

  it('should return an error when width is below 500', async () => {
    // Arrange
    const values = { width: 300, height: 600 };
    // Act
    const result = await formValidation.validateForm(values);
    // Assert
    expect((result as any)['width']).toBe(
      'The value must be greater than or equal to 499'
    );
  });

  it('should return an error when height is below 500', async () => {
    // Arrange
    const values = { width: 600, height: 300 };
    // Act
    const result = await formValidation.validateForm(values);
    // Assert
    expect((result as any)['height']).toBe(
      'The value must be greater than or equal to 499'
    );
  });
});
