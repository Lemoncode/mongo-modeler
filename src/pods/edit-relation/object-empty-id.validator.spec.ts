import { objectEmptyIdValidator } from './object-empty-id.validator';

describe('objectEmptyIdValidator', () => {
  it('should return true and custom message when object with id is provided', () => {
    // Arrange
    const object = {
      id: 'test',
    };
    const customMessage = 'New Message';

    // Act
    const result = objectEmptyIdValidator({
      value: object,
      message: customMessage,
    });

    // Assert
    expect(result.succeeded).toBeTruthy();
  });
  it('should return true and custom message when object with id is provided', () => {
    // Arrange
    const object = {
      id: 'test',
      name: 'Hello',
    };
    const customMessage = 'New Message';

    // Act
    const result = objectEmptyIdValidator({
      value: object,
      message: customMessage,
    });

    // Assert
    expect(result.succeeded).toBeTruthy();
  });
  it('should return false and custom message when object with empty id and custom message is provided', () => {
    // Arrange
    const object = {
      id: '',
    };
    const customMessage = 'New Message';

    // Act
    const result = objectEmptyIdValidator({
      value: object,
      message: customMessage,
    });

    // Assert
    expect(result.succeeded).toBeFalsy();
    expect(result.message).toBe('New Message');
  });

  it('should return false and default message when object with empty id', () => {
    // Arrange
    const object = {
      id: '',
    };
    // Act
    const result = objectEmptyIdValidator({
      value: object,
    });

    // Assert
    expect(result.succeeded).toBeFalsy();
    expect(result.message).toBe('Please inform the field');
  });

  it('should return false when object is empty', () => {
    // Arrange
    const object = {};

    // Act
    const result = objectEmptyIdValidator({
      value: object,
    });

    // Assert
    expect(result.succeeded).toBeFalsy();
  });

  it('should return false and custom message when object is not an object', () => {
    // Arrange
    const object = '';

    // Act
    const result = objectEmptyIdValidator({
      value: object,
    });

    // Assert
    expect(result.succeeded).toBeFalsy();
  });
  it('should return false and custom message when object without id iand custom message is provided', () => {
    // Arrange
    const object = {
      name: 'Hello',
    };
    const customMessage = 'New Message';

    // Act
    const result = objectEmptyIdValidator({
      value: object,
      message: customMessage,
    });

    // Assert
    expect(result.succeeded).toBeFalsy();
    expect(result.message).toBe('New Message');
  });
});
