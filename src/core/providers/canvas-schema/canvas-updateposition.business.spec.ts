import { Size } from '@/core/model';
import { UpdateInfo, calculateTablePosition } from './canvas.business';
import {
  DatabaseSchemaVm,
  RelationVm,
  TableVm,
  TABLE_CONST,
} from '@/core/providers/canvas-schema';

describe('calculateTablePosition', () => {
  it('updates the position of the specified table within canvas boundaries', () => {
    //Arrange
    const tables: TableVm[] = [
      {
        id: '1',
        x: TABLE_CONST.DEFAULT_TABLE_WIDTH / 2,
        y: 150,
        tableName: 'tags',
        fields: [
          {
            id: '1',
            name: 'id',
            type: 'number',
            PK: false,
          },
          {
            id: '2',
            name: 'name',
            type: 'string',
            PK: false,
          },
        ],
      },
      {
        id: '2',
        x: 10,
        y: 20,
        tableName: 'Restaurant',
        fields: [
          {
            id: '1',
            name: 'id',
            type: 'number',
            PK: false,
          },
          {
            id: '2',
            name: 'name',
            type: 'string',
            PK: false,
          },
        ],
      },
    ];
    const relations: RelationVm[] = [
      {
        fromTableId: '1',
        toTableId: '2',
        fromFieldId: '1',
        toFieldId: '2',
        type: '1:M',
      },
    ];
    const schema: DatabaseSchemaVm = { tables, relations };
    const updateInfo: UpdateInfo = {
      id: '1',
      position: { x: 200, y: 500 },
      totalHeight: 400,
    };
    const canvasSize: Size = {
      height: 2400,
      width: 2400,
    };

    // Act
    const result = calculateTablePosition(schema, updateInfo, canvasSize);

    // Assert
    const expected: DatabaseSchemaVm = {
      ...schema,
      tables: [
        {
          id: '1',
          x: 200,
          y: 500,
          tableName: 'tags',
          fields: [
            {
              id: '1',
              name: 'id',
              type: 'number',
              PK: false,
            },
            {
              id: '2',
              name: 'name',
              type: 'string',
              PK: false,
            },
          ],
        },
        {
          id: '2',
          x: 10,
          y: 20,
          tableName: 'Restaurant',
          fields: [
            {
              id: '1',
              name: 'id',
              type: 'number',
              PK: false,
            },
            {
              id: '2',
              name: 'name',
              type: 'string',
              PK: false,
            },
          ],
        },
      ],
    };
    expect(result).toEqual(expected);
    expect(expected.tables[0].x).toBeGreaterThan(0);
    expect(expected.tables[0].x).toBeLessThanOrEqual(
      canvasSize.width - TABLE_CONST.DEFAULT_TABLE_WIDTH
    );
    expect(expected.tables[0].y).toBeGreaterThan(0);
    expect(expected.tables[0].y).toBeLessThanOrEqual(
      canvasSize.height - updateInfo.totalHeight
    );
  });
  it('updates the position of the table within the canvas when table width (now DEFAULT_TABLE_WIDTH) + canvasSize.width > canvasSize.width', () => {
    //Arrange
    const tables: TableVm[] = [
      {
        id: '1',
        x: TABLE_CONST.DEFAULT_TABLE_WIDTH / 2,
        y: 150,
        tableName: 'tags',
        fields: [
          {
            id: '1',
            name: 'id',
            type: 'number',
            PK: false,
          },
          {
            id: '2',
            name: 'name',
            type: 'string',
            PK: false,
          },
        ],
      },
      {
        id: '2',
        x: 10,
        y: 20,
        tableName: 'Restaurant',
        fields: [
          {
            id: '1',
            name: 'id',
            type: 'number',
            PK: false,
          },
          {
            id: '2',
            name: 'name',
            type: 'string',
            PK: false,
          },
        ],
      },
    ];
    const relations: RelationVm[] = [
      {
        fromTableId: '1',
        toTableId: '2',
        fromFieldId: '1',
        toFieldId: '2',
        type: '1:M',
      },
    ];
    const schema: DatabaseSchemaVm = { tables, relations };
    const updateInfo: UpdateInfo = {
      id: '1',
      position: { x: 2300, y: 500 },
      totalHeight: 400,
    };
    const canvasSize: Size = {
      height: 2400,
      width: 2400,
    };

    // Act
    const result = calculateTablePosition(schema, updateInfo, canvasSize);

    // Assert
    const expected: DatabaseSchemaVm = {
      ...schema,
      tables: [
        {
          id: '1',
          x: 2100,
          y: 500,
          tableName: 'tags',
          fields: [
            {
              id: '1',
              name: 'id',
              type: 'number',
              PK: false,
            },
            {
              id: '2',
              name: 'name',
              type: 'string',
              PK: false,
            },
          ],
        },
        {
          id: '2',
          x: 10,
          y: 20,
          tableName: 'Restaurant',
          fields: [
            {
              id: '1',
              name: 'id',
              type: 'number',
              PK: false,
            },
            {
              id: '2',
              name: 'name',
              type: 'string',
              PK: false,
            },
          ],
        },
      ],
    };

    expect(result).toEqual(expected);
    expect(expected.tables[0].x).toBeGreaterThan(0);
    expect(expected.tables[0].x).toBe(
      canvasSize.width - TABLE_CONST.DEFAULT_TABLE_WIDTH
    );
    expect(expected.tables[0].y).toBeGreaterThan(0);
    expect(expected.tables[0].y).toBeLessThanOrEqual(
      canvasSize.height - updateInfo.totalHeight
    );
  });
  it('updates the position of the table within the canvas when updateInfo.totalHeight + canvasSize.height > canvasSize.height', () => {
    //Arrange
    const tables: TableVm[] = [
      {
        id: '1',
        x: TABLE_CONST.DEFAULT_TABLE_WIDTH / 2,
        y: 150,
        tableName: 'tags',
        fields: [
          {
            id: '1',
            name: 'id',
            type: 'number',
            PK: false,
          },
          {
            id: '2',
            name: 'name',
            type: 'string',
            PK: false,
          },
        ],
      },
      {
        id: '2',
        x: 10,
        y: 20,
        tableName: 'Restaurant',
        fields: [
          {
            id: '1',
            name: 'id',
            type: 'number',
            PK: false,
          },
          {
            id: '2',
            name: 'name',
            type: 'string',
            PK: false,
          },
        ],
      },
    ];
    const relations: RelationVm[] = [
      {
        fromTableId: '1',
        toTableId: '2',
        fromFieldId: '1',
        toFieldId: '2',
        type: '1:M',
      },
    ];
    const schema: DatabaseSchemaVm = { tables, relations };
    const updateInfo: UpdateInfo = {
      id: '1',
      position: { x: 100, y: 2300 },
      totalHeight: 400,
    };
    const canvasSize: Size = {
      height: 2400,
      width: 2400,
    };

    // Act
    const result = calculateTablePosition(schema, updateInfo, canvasSize);

    // Assert
    const expected: DatabaseSchemaVm = {
      ...schema,
      tables: [
        {
          id: '1',
          x: 100,
          y: 2000,
          tableName: 'tags',
          fields: [
            {
              id: '1',
              name: 'id',
              type: 'number',
              PK: false,
            },
            {
              id: '2',
              name: 'name',
              type: 'string',
              PK: false,
            },
          ],
        },
        {
          id: '2',
          x: 10,
          y: 20,
          tableName: 'Restaurant',
          fields: [
            {
              id: '1',
              name: 'id',
              type: 'number',
              PK: false,
            },
            {
              id: '2',
              name: 'name',
              type: 'string',
              PK: false,
            },
          ],
        },
      ],
    };

    expect(result).toEqual(expected);
    expect(expected.tables[0].x).toBeGreaterThan(0);
    expect(expected.tables[0].x).toBeLessThanOrEqual(
      canvasSize.width - TABLE_CONST.DEFAULT_TABLE_WIDTH
    );
    expect(expected.tables[0].y).toBeGreaterThan(0);
    expect(expected.tables[0].y).toBe(
      canvasSize.height - updateInfo.totalHeight
    );
  });
  it('updates the position of the table within the canvas when updateInfo.position.x < 0', () => {
    //Arrange
    const tables: TableVm[] = [
      {
        id: '1',
        x: TABLE_CONST.DEFAULT_TABLE_WIDTH / 2,
        y: 150,
        tableName: 'tags',
        fields: [
          {
            id: '1',
            name: 'id',
            type: 'number',
            PK: false,
          },
          {
            id: '2',
            name: 'name',
            type: 'string',
            PK: false,
          },
        ],
      },
      {
        id: '2',
        x: 10,
        y: 20,
        tableName: 'Restaurant',
        fields: [
          {
            id: '1',
            name: 'id',
            type: 'number',
            PK: false,
          },
          {
            id: '2',
            name: 'name',
            type: 'string',
            PK: false,
          },
        ],
      },
    ];
    const relations: RelationVm[] = [
      {
        fromTableId: '1',
        toTableId: '2',
        fromFieldId: '1',
        toFieldId: '2',
        type: '1:M',
      },
    ];
    const schema: DatabaseSchemaVm = { tables, relations };
    const updateInfo: UpdateInfo = {
      id: '1',
      position: { x: -100, y: 100 },
      totalHeight: 400,
    };
    const canvasSize: Size = {
      height: 2400,
      width: 2400,
    };

    // Act
    const result = calculateTablePosition(schema, updateInfo, canvasSize);

    // Assert
    const expected: DatabaseSchemaVm = {
      ...schema,
      tables: [
        {
          id: '1',
          x: 0,
          y: 100,
          tableName: 'tags',
          fields: [
            {
              id: '1',
              name: 'id',
              type: 'number',
              PK: false,
            },
            {
              id: '2',
              name: 'name',
              type: 'string',
              PK: false,
            },
          ],
        },
        {
          id: '2',
          x: 10,
          y: 20,
          tableName: 'Restaurant',
          fields: [
            {
              id: '1',
              name: 'id',
              type: 'number',
              PK: false,
            },
            {
              id: '2',
              name: 'name',
              type: 'string',
              PK: false,
            },
          ],
        },
      ],
    };

    expect(result).toEqual(expected);
    expect(expected.tables[0].x).toBe(0);
    expect(expected.tables[0].x).toBeLessThanOrEqual(
      canvasSize.width - TABLE_CONST.DEFAULT_TABLE_WIDTH
    );
    expect(expected.tables[0].y).toBeGreaterThan(0);
    expect(expected.tables[0].y).toBeLessThanOrEqual(
      canvasSize.height - updateInfo.totalHeight
    );
  });
  it('updates the position of the table within the canvas when updateInfo.position.y < 0', () => {
    //Arrange
    const tables: TableVm[] = [
      {
        id: '1',
        x: TABLE_CONST.DEFAULT_TABLE_WIDTH / 2,
        y: 150,
        tableName: 'tags',
        fields: [
          {
            id: '1',
            name: 'id',
            type: 'number',
            PK: false,
          },
          {
            id: '2',
            name: 'name',
            type: 'string',
            PK: false,
          },
        ],
      },
      {
        id: '2',
        x: 10,
        y: 20,
        tableName: 'Restaurant',
        fields: [
          {
            id: '1',
            name: 'id',
            type: 'number',
            PK: false,
          },
          {
            id: '2',
            name: 'name',
            type: 'string',
            PK: false,
          },
        ],
      },
    ];
    const relations: RelationVm[] = [
      {
        fromTableId: '1',
        toTableId: '2',
        fromFieldId: '1',
        toFieldId: '2',
        type: '1:M',
      },
    ];
    const schema: DatabaseSchemaVm = { tables, relations };
    const updateInfo: UpdateInfo = {
      id: '1',
      position: { x: 100, y: -100 },
      totalHeight: 400,
    };
    const canvasSize: Size = {
      height: 2400,
      width: 2400,
    };

    // Act
    const result = calculateTablePosition(schema, updateInfo, canvasSize);

    // Assert
    const expected: DatabaseSchemaVm = {
      ...schema,
      tables: [
        {
          id: '1',
          x: 100,
          y: 0,
          tableName: 'tags',
          fields: [
            {
              id: '1',
              name: 'id',
              type: 'number',
              PK: false,
            },
            {
              id: '2',
              name: 'name',
              type: 'string',
              PK: false,
            },
          ],
        },
        {
          id: '2',
          x: 10,
          y: 20,
          tableName: 'Restaurant',
          fields: [
            {
              id: '1',
              name: 'id',
              type: 'number',
              PK: false,
            },
            {
              id: '2',
              name: 'name',
              type: 'string',
              PK: false,
            },
          ],
        },
      ],
    };

    expect(result).toEqual(expected);
    expect(expected.tables[0].x).toBeGreaterThan(0);
    expect(expected.tables[0].x).toBeLessThanOrEqual(
      canvasSize.width - TABLE_CONST.DEFAULT_TABLE_WIDTH
    );
    expect(expected.tables[0].y).toBe(0);
    expect(expected.tables[0].y).toBeLessThanOrEqual(
      canvasSize.height - updateInfo.totalHeight
    );
  });
});
