import {
  calculateRelationXCoordinate,
  calculateRelationXCoordinateEnd,
  calculateRelationXCoordinateOrigin,
} from './canvas.business';
import { TableVm } from '@/core/providers/canvas-schema';

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
          PK: false,
        },
        {
          id: '2',
          name: 'field2',
          type: 'string',
          PK: false,
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
          PK: false,
        },
        {
          id: '2',
          name: 'field2',
          type: 'string',
          PK: false,
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
          PK: false,
        },
        {
          id: '2',
          name: 'field2',
          type: 'string',
          PK: false,
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
          PK: false,
        },
        {
          id: '2',
          name: 'field2',
          type: 'string',
          PK: false,
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
          PK: false,
        },
        {
          id: '2',
          name: 'field2',
          type: 'string',
          PK: false,
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
          PK: false,
        },
        {
          id: '2',
          name: 'field2',
          type: 'string',
          PK: false,
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
          PK: false,
        },
        {
          id: '2',
          name: 'field2',
          type: 'string',
          PK: false,
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
          PK: false,
        },
        {
          id: '2',
          name: 'field2',
          type: 'string',
          PK: false,
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
  it('Should returns XRelationCoords', () => {
    //Arrange
    const tableOrigin: TableVm = {
      id: '1',
      fields: [
        {
          id: '1',
          name: 'field1',
          type: 'string',
          PK: false,
        },
        {
          id: '2',
          name: 'field2',
          type: 'string',
          PK: false,
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
          PK: false,
        },
        {
          id: '2',
          name: 'field2',
          type: 'string',
          PK: false,
        },
      ],
      tableName: 'table2',
      x: 500,
      y: 0,
    };

    // Act
    const result = calculateRelationXCoordinate(tableOrigin, tableDestination);

    // Assert
    expect(result).toEqual({ xOrigin: 500, xDestination: 500 });
  });
});
