import {
  calculateRelationXCoordinate,
  calculateRelationXCoordinateEnd,
  calculateRelationXCoordinateOrigin,
} from './canvas.business';
import { TableVm } from '@/core/providers/canvas-schema';
import { TABLE_CONST } from './canvas.const';

describe('calculateRelationXCoordinateOrigin', () => {
  it('Should returns xCoordinateOrigin + DEFAULT_TABLE_WIDTH, if tableOrigin.x < tableDestination.x', () => {
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
      x: TABLE_CONST.DEFAULT_TABLE_WIDTH - 200,
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
      x: TABLE_CONST.DEFAULT_TABLE_WIDTH + 200,
      y: 0,
    };

    // Act
    const result = calculateRelationXCoordinateOrigin(
      tableOrigin,
      tableDestination
    );

    // Assert
    expect(result).toBe(TABLE_CONST.DEFAULT_TABLE_WIDTH + 100);
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
      x: TABLE_CONST.DEFAULT_TABLE_WIDTH + 200,
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
      x: TABLE_CONST.DEFAULT_TABLE_WIDTH - 200,
      y: 0,
    };

    // Act
    const result = calculateRelationXCoordinateOrigin(
      tableOrigin,
      tableDestination
    );

    // Assert
    expect(result).toBe(TABLE_CONST.DEFAULT_TABLE_WIDTH + 200);
  });
});

describe('calculateRelationXCoordinateEnd', () => {
  it('Should returns xCoordinateEnd + DEFAULT_TABLE_WIDTH, if tableDestination.x < tableOrigin.x  ', () => {
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
      x: TABLE_CONST.DEFAULT_TABLE_WIDTH + 200,
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
      x: TABLE_CONST.DEFAULT_TABLE_WIDTH - 200,
      y: 0,
    };

    // Act
    const result = calculateRelationXCoordinateEnd(
      tableOrigin,
      tableDestination
    );

    // Assert
    expect(result).toBe(TABLE_CONST.DEFAULT_TABLE_WIDTH + 100);
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
      x: TABLE_CONST.DEFAULT_TABLE_WIDTH - 200,
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
      x: TABLE_CONST.DEFAULT_TABLE_WIDTH + 200,
      y: 0,
    };

    // Act
    const result = calculateRelationXCoordinateEnd(
      tableOrigin,
      tableDestination
    );

    // Assert
    expect(result).toBe(TABLE_CONST.DEFAULT_TABLE_WIDTH + 200);
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
      x: TABLE_CONST.DEFAULT_TABLE_WIDTH + 200,
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
      x: TABLE_CONST.DEFAULT_TABLE_WIDTH + 200,
      y: 0,
    };

    // Act
    const result = calculateRelationXCoordinate(tableOrigin, tableDestination);

    // Assert
    expect(result).toEqual({
      xOrigin: TABLE_CONST.DEFAULT_TABLE_WIDTH + 200,
      xDestination: TABLE_CONST.DEFAULT_TABLE_WIDTH + 200,
    });
  });
});
