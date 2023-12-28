import { UpdateInfo, calculateTablePosition } from './canvas.business';
import { DatabaseSchemaVm, RelationVm, Size, TableVm } from './canvas.vm';

describe('calculateTablePosition', () => {
  it('updates the position of the specified table within canvas boundaries', () => {
    //Arrange
    const tables: TableVm[] = [
      {
        id: '1',
        x: 100,
        y: 150,
        tableName: 'tags',
        fields: [
          {
            id: '1',
            name: 'id',
            type: 'number'
          },
          {
            id: '2',
            name: 'name',
            type: 'string'
          }
        ]
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
            type: 'number'
          },
          {
            id: '2',
            name: 'name',
            type: 'string'
          }
        ]
      }
    ];
    const relations: RelationVm[] = [
      {
        fromTableId: '1',
        toTableId: '2',
        fromFieldId: '1',
        toFieldId: '2',
        type: '1:M'
      }
    ];
    const schema: DatabaseSchemaVm = { tables, relations };
    const updateInfo: UpdateInfo = {
      id: '1',
      position: { x: 200, y: 500 },
      totalHeight: 400
    };
    const canvasSize: Size = {
      height: 2400,
      width: 2400
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
              type: 'number'
            },
            {
              id: '2',
              name: 'name',
              type: 'string'
            }
          ]
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
              type: 'number'
            },
            {
              id: '2',
              name: 'name',
              type: 'string'
            }
          ]
        }
      ]
    };
    expect(result).toEqual(expected);
    expect(expected.tables[1].x).toBeGreaterThan(0);
    expect(expected.tables[1].x).toBeLessThanOrEqual(canvasSize.width - 300);
    expect(expected.tables[1].y).toBeGreaterThan(0);
    expect(expected.tables[1].y).toBeLessThanOrEqual(
      canvasSize.height - updateInfo.totalHeight
    );
  });
});
