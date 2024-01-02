import {
  calculateRelationXCoordinate,
  calculateRelationXCoordinateEnd,
  calculateRelationXCoordinateOrigin,
} from './canvas.business';
import { TableVm } from './canvas.vm';

describe('calculateRelationXCoordinateOrigin', () => {
  it('Should returns xCoordinateOrigin + 300, if tableOrigin.x < tableDestination.x', () => {
    //Arrange
    const tableOrigin: TableVm = {
      id: '1',
      fields: [
        {
          id: '1',
          name: 'field1',
          type: 'string',
        },
        {
          id: '2',
          name: 'field2',
          type: 'string',
        },
      ],
      tableName: 'table1',
      x: 100,
      y: 0,
    };
    const tableDestination: TableVm = {
      id: '1',
      fields: [
        {
          id: '1',
          name: 'field1',
          type: 'string',
        },
        {
          id: '2',
          name: 'field2',
          type: 'string',
        },
      ],
      tableName: 'table2',
      x: 500,
      y: 0,
    };

    // Act
    const result = calculateRelationXCoordinateOrigin(
      tableOrigin,
      tableDestination
    );

    // Assert
    expect(result).toBe(400);
  });
  it('Should returns xCoordinateOrigin, if tableOrigin.x > tableDestination.x', () => {
    //Arrange
    const tableOrigin: TableVm = {
      id: '1',
      fields: [
        {
          id: '1',
          name: 'field1',
          type: 'string',
        },
        {
          id: '2',
          name: 'field2',
          type: 'string',
        },
      ],
      tableName: 'table1',
      x: 500,
      y: 0,
    };
    const tableDestination: TableVm = {
      id: '1',
      fields: [
        {
          id: '1',
          name: 'field1',
          type: 'string',
        },
        {
          id: '2',
          name: 'field2',
          type: 'string',
        },
      ],
      tableName: 'table2',
      x: 100,
      y: 0,
    };

    // Act
    const result = calculateRelationXCoordinateOrigin(
      tableOrigin,
      tableDestination
    );

    // Assert
    expect(result).toBe(500);
  });
});

describe('calculateRelationXCoordinateEnd', () => {
  it('Should returns xCoordinateEnd + 300, if tableDestination.x < tableOrigin.x  ', () => {
    //Arrange
    const tableOrigin: TableVm = {
      id: '1',
      fields: [
        {
          id: '1',
          name: 'field1',
          type: 'string',
        },
        {
          id: '2',
          name: 'field2',
          type: 'string',
        },
      ],
      tableName: 'table1',
      x: 500,
      y: 0,
    };
    const tableDestination: TableVm = {
      id: '1',
      fields: [
        {
          id: '1',
          name: 'field1',
          type: 'string',
        },
        {
          id: '2',
          name: 'field2',
          type: 'string',
        },
      ],
      tableName: 'table2',
      x: 100,
      y: 0,
    };

    // Act
    const result = calculateRelationXCoordinateEnd(
      tableOrigin,
      tableDestination
    );

    // Assert
    expect(result).toBe(400);
  });
  it('Should returns xCoordinateEnd, if tableDestination.x > tableOrigin.x', () => {
    //Arrange
    const tableOrigin: TableVm = {
      id: '1',
      fields: [
        {
          id: '1',
          name: 'field1',
          type: 'string',
        },
        {
          id: '2',
          name: 'field2',
          type: 'string',
        },
      ],
      tableName: 'table1',
      x: 100,
      y: 0,
    };
    const tableDestination: TableVm = {
      id: '1',
      fields: [
        {
          id: '1',
          name: 'field1',
          type: 'string',
        },
        {
          id: '2',
          name: 'field2',
          type: 'string',
        },
      ],
      tableName: 'table2',
      x: 500,
      y: 0,
    };

    // Act
    const result = calculateRelationXCoordinateEnd(
      tableOrigin,
      tableDestination
    );

    // Assert
    expect(result).toBe(500);
  });
});

describe('calculateRelationXCoordinate', () => {
  it('Should returns XRelationCoords, if tableDestination.x < tableOrigin.x  ', () => {
    //Arrange
    const tableOrigin: TableVm = {
      id: '1',
      fields: [
        {
          id: '1',
          name: 'field1',
          type: 'string',
        },
        {
          id: '2',
          name: 'field2',
          type: 'string',
        },
      ],
      tableName: 'table1',
      x: 500,
      y: 0,
    };
    const tableDestination: TableVm = {
      id: '1',
      fields: [
        {
          id: '1',
          name: 'field1',
          type: 'string',
        },
        {
          id: '2',
          name: 'field2',
          type: 'string',
        },
      ],
      tableName: 'table2',
      x: 500,
      y: 0,
    };

    // Act
    const result = calculateRelationXCoordinate(tableOrigin, tableDestination);

    // Assert
    //Todo: implementar qeu sean iguales en los otros test
    expect(result).toEqual({ xOrigin: 500, xDestination: 500 });
  });
  it('Should returns xCoordinateEnd, if tableDestination.x > tableOrigin.x', () => {
    //Arrange
    const tableOrigin: TableVm = {
      id: '1',
      fields: [
        {
          id: '1',
          name: 'field1',
          type: 'string',
        },
        {
          id: '2',
          name: 'field2',
          type: 'string',
        },
      ],
      tableName: 'table1',
      x: 100,
      y: 0,
    };
    const tableDestination: TableVm = {
      id: '1',
      fields: [
        {
          id: '1',
          name: 'field1',
          type: 'string',
        },
        {
          id: '2',
          name: 'field2',
          type: 'string',
        },
      ],
      tableName: 'table2',
      x: 500,
      y: 0,
    };

    // Act
    const result = calculateRelationXCoordinateEnd(
      tableOrigin,
      tableDestination
    );

    // Assert
    expect(result).toBe(500);
  });
});
