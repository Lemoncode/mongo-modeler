import { FieldVm, TABLE_CONST, TableVm } from '@/core/providers';
import {
  calculateTableEndYPosition,
  calculateTableHeight,
  getFieldsCount,
  getMaxPositionXFromTables,
  getMaxPositionYFromTables,
} from './export-button.business';

describe('export-button.business', () => {
  describe('getMaxPositionXFromTables', () => {
    it('should return 0 max position x from tables', () => {
      // Arrange
      const tables: TableVm[] = [];

      // Act
      const result = getMaxPositionXFromTables(tables);

      // Assert
      expect(result).toEqual(0);
    });

    it('should return 20 max position x from tables', () => {
      // Arrange
      const tables: TableVm[] = [
        {
          id: '1',
          fields: [
            {
              id: '1',
              PK: true,
              name: 'field1',
              type: 'string',
            },
            {
              id: '2',
              PK: false,
              name: 'field2',
              type: 'string',
            },
          ],
          tableName: 'table1',
          x: 20,
          y: 0,
        },
        {
          id: '2',
          fields: [
            {
              id: '1',
              PK: true,
              name: 'field1',
              type: 'string',
            },
          ],
          tableName: 'table2',
          x: 5,
          y: 0,
        },
      ];

      // Act
      const result = getMaxPositionXFromTables(tables);

      // Assert
      expect(result).toEqual(20);
    });

    it('should return 15 max position x from tables', () => {
      // Arrange
      const tables: TableVm[] = [
        {
          id: '1',
          fields: [
            {
              id: '1',
              PK: true,
              name: 'field1',
              type: 'string',
            },
            {
              id: '2',
              PK: false,
              name: 'field2',
              type: 'string',
            },
          ],
          tableName: 'table1',
          x: 5,
          y: 0,
        },
        {
          id: '2',
          fields: [
            {
              id: '1',
              PK: true,
              name: 'field1',
              type: 'string',
            },
          ],
          tableName: 'table2',
          x: 15,
          y: 0,
        },
      ];

      // Act
      const result = getMaxPositionXFromTables(tables);

      // Assert
      expect(result).toEqual(15);
    });
  });

  describe('getFielsCount', () => {
    it('should return 0 fields count when fields is empty', () => {
      // Arrange
      const fields: FieldVm[] = [];

      // Act
      const result = getFieldsCount(fields);

      // Assert
      expect(result).toEqual(0);
    });

    it('should return 1 fields count when fields has one field', () => {
      // Arrange
      const fields: FieldVm[] = [
        {
          id: '1',
          PK: true,
          name: 'field1',
          type: 'string',
        },
      ];

      // Act
      const result = getFieldsCount(fields);

      // Assert
      expect(result).toEqual(1);
    });

    it('should return 2 fields count when fields has two fields', () => {
      // Arrange
      const fields: FieldVm[] = [
        {
          id: '1',
          PK: true,
          name: 'field1',
          type: 'string',
        },
        {
          id: '2',
          PK: false,
          name: 'field2',
          type: 'string',
        },
      ];

      // Act
      const result = getFieldsCount(fields);

      // Assert
      expect(result).toEqual(2);
    });

    it('should return 2 fields count when fields has 1 field and this field has a isCollapsed equals false with 1 children', () => {
      // Arrange
      const fields: FieldVm[] = [
        {
          id: '1',
          PK: true,
          name: 'field1',
          type: 'string',
          children: [
            {
              id: '2',
              PK: false,
              name: 'field2',
              type: 'string',
            },
          ],
          isCollapsed: false,
        },
      ];

      // Act
      const result = getFieldsCount(fields);

      // Assert
      expect(result).toEqual(2);
    });

    it('should return 3 fields count when fields has 1 field and this field has a isCollapsed equals false with 2 children', () => {
      // Arrange
      const fields: FieldVm[] = [
        {
          id: '1',
          PK: true,
          name: 'field1',
          type: 'string',
          children: [
            {
              id: '2',
              PK: false,
              name: 'field2',
              type: 'string',
            },
            {
              id: '3',
              PK: false,
              name: 'field3',
              type: 'string',
            },
          ],
          isCollapsed: false,
        },
      ];

      // Act
      const result = getFieldsCount(fields);

      // Assert
      expect(result).toEqual(3);
    });

    it('should return 3 fields count when fields has 1 field and this field has a isCollapsed equals false with 2 children and 1 of them has 1 children', () => {
      // Arrange
      const fields: FieldVm[] = [
        {
          id: '1',
          PK: true,
          name: 'field1',
          type: 'string',
          children: [
            {
              id: '2',
              PK: false,
              name: 'field2',
              type: 'string',
            },
            {
              id: '3',
              PK: false,
              name: 'field3',
              type: 'string',
              children: [
                {
                  id: '4',
                  PK: false,
                  name: 'field4',
                  type: 'string',
                },
              ],
              isCollapsed: false,
            },
          ],
          isCollapsed: false,
        },
      ];

      // Act
      const result = getFieldsCount(fields);

      // Assert
      expect(result).toEqual(4);
    });

    it('should return 1 fields count when fields has 1 field and this field has a isCollapsed equals true with 2 children', () => {
      // Arrange
      const fields: FieldVm[] = [
        {
          id: '1',
          PK: true,
          name: 'field1',
          type: 'string',
          children: [
            {
              id: '2',
              PK: false,
              name: 'field2',
              type: 'string',
            },
            {
              id: '3',
              PK: false,
              name: 'field3',
              type: 'string',
            },
          ],
          isCollapsed: true,
        },
      ];

      // Act
      const result = getFieldsCount(fields);

      // Assert
      expect(result).toEqual(1);
    });

    it('should return 1 fields count when fields has 1 field and this field has a isCollapsed equals true with 2 children and 1 of them has 1 children', () => {
      // Arrange
      const fields: FieldVm[] = [
        {
          id: '1',
          PK: true,
          name: 'field1',
          type: 'string',
          children: [
            {
              id: '2',
              PK: false,
              name: 'field2',
              type: 'string',
            },
            {
              id: '3',
              PK: false,
              name: 'field3',
              type: 'string',
              children: [
                {
                  id: '4',
                  PK: false,
                  name: 'field4',
                  type: 'string',
                },
              ],
              isCollapsed: true,
            },
          ],
          isCollapsed: true,
        },
      ];

      // Act
      const result = getFieldsCount(fields);

      // Assert
      expect(result).toEqual(1);
    });

    it('should return 1 fields count when fields has 1 field and this field has a isCollapsed equals true with 2 children and 1 of them has 1 children and isCollapsed equals false', () => {
      // Arrange
      const fields: FieldVm[] = [
        {
          id: '1',
          PK: true,
          name: 'field1',
          type: 'string',
          children: [
            {
              id: '2',
              PK: false,
              name: 'field2',
              type: 'string',
            },
            {
              id: '3',
              PK: false,
              name: 'field3',
              type: 'string',
              children: [
                {
                  id: '4',
                  PK: false,
                  name: 'field4',
                  type: 'string',
                },
              ],
              isCollapsed: false,
            },
          ],
          isCollapsed: true,
        },
      ];

      // Act
      const result = getFieldsCount(fields);

      // Assert
      expect(result).toEqual(1);
    });

    it('should return 1 fields count when fields has 1 field and this field has a isCollapsed equals true with 2 children and 1 of them has 1 children and isCollapsed equals true', () => {
      // Arrange
      const fields: FieldVm[] = [
        {
          id: '1',
          PK: true,
          name: 'field1',
          type: 'string',
          children: [
            {
              id: '2',
              PK: false,
              name: 'field2',
              type: 'string',
            },
            {
              id: '3',
              PK: false,
              name: 'field3',
              type: 'string',
              children: [
                {
                  id: '4',
                  PK: false,
                  name: 'field4',
                  type: 'string',
                },
              ],
              isCollapsed: true,
            },
          ],
          isCollapsed: true,
        },
      ];

      // Act
      const result = getFieldsCount(fields);

      // Assert
      expect(result).toEqual(1);
    });

    it('should return 4 fields count when fields has 1 field and this field has a isCollapsed equals false with 1 chilren with isCollapsed equals false and this another children with isCollapsed equals false and 1 children', () => {
      // Arrange
      const fields: FieldVm[] = [
        {
          id: '1',
          PK: true,
          name: 'field1',
          type: 'string',
          children: [
            {
              id: '2',
              PK: false,
              name: 'field2',
              type: 'string',
              children: [
                {
                  id: '3',
                  PK: false,
                  name: 'field3',
                  type: 'string',
                  children: [
                    {
                      id: '4',
                      PK: false,
                      name: 'field4',
                      type: 'string',
                    },
                  ],
                },
              ],
              isCollapsed: false,
            },
          ],
          isCollapsed: false,
        },
      ];

      // Act
      const result = getFieldsCount(fields);

      // Assert
      expect(result).toEqual(4);
    });

    it('should return 5 fields count when fields has 1 field and this field has a isCollapsed equals false with 1 chilren with isCollapsed equals false and this another children with isCollapsed equals false and 1 children and this another children with isCollapsed equals true and 1 children', () => {
      // Arrange
      const fields: FieldVm[] = [
        {
          id: '1',
          PK: true,
          name: 'field1',
          type: 'string',
          children: [
            {
              id: '2',
              PK: false,
              name: 'field2',
              type: 'string',
              children: [
                {
                  id: '3',
                  PK: false,
                  name: 'field3',
                  type: 'string',
                  children: [
                    {
                      id: '4',
                      PK: false,
                      name: 'field4',
                      type: 'string',
                      isCollapsed: true,
                    },
                  ],
                  isCollapsed: true,
                },
              ],
              isCollapsed: false,
            },
            {
              id: '5',
              PK: false,
              name: 'field5',
              type: 'string',
              children: [
                {
                  id: '6',
                  PK: false,
                  name: 'field6',
                  type: 'string',
                  isCollapsed: true,
                },
              ],
              isCollapsed: true,
            },
          ],
          isCollapsed: false,
        },
      ];

      // Act
      const result = getFieldsCount(fields);

      // Assert
      expect(result).toEqual(4);
    });
  });

  // TODO: THIS TEST MUST BE CHANGE  WHEN WE CHANGE THE CONST USE IN THE FUNCTION
  describe('calculateTableHeight', () => {
    it('should return 169 when fields count is 5', () => {
      // Arrange
      const fields: FieldVm[] = [
        {
          id: '1',
          PK: true,
          name: 'field1',
          type: 'string',
        },
        {
          id: '2',
          PK: false,
          name: 'field2',
          type: 'string',
        },
        {
          id: '3',
          PK: false,
          name: 'field3',
          type: 'string',
        },
        {
          id: '4',
          PK: false,
          name: 'field4',
          type: 'string',
        },
        {
          id: '5',
          PK: false,
          name: 'field5',
          type: 'string',
        },
      ];

      // Act
      const result = calculateTableHeight(fields);

      // Assert
      const expected =
        TABLE_CONST.HEADER_HEIGHT +
        TABLE_CONST.HEADER_TITLE_GAP +
        TABLE_CONST.ROW_HEIGHT * 5 +
        TABLE_CONST.ROW_PADDING;
      expect(result).toEqual(expected);
    });

    it('should return 97 when fields count is 2', () => {
      // Arrange
      const fields: FieldVm[] = [
        {
          id: '1',
          PK: true,
          name: 'field1',
          type: 'string',
          children: [
            {
              id: '2',
              PK: false,
              name: 'field2',
              type: 'string',
            },
          ],
        },
      ];

      // Act
      const result = calculateTableHeight(fields);

      // Assert
      const expected =
        TABLE_CONST.HEADER_HEIGHT +
        TABLE_CONST.HEADER_TITLE_GAP +
        TABLE_CONST.ROW_HEIGHT * 2 +
        TABLE_CONST.ROW_PADDING;
      expect(result).toEqual(expected);
    });

    it('should return 73 when fields count is 2 and isCollapsed is true', () => {
      // Arrange
      const fields: FieldVm[] = [
        {
          id: '1',
          PK: true,
          name: 'field1',
          type: 'string',

          isCollapsed: true,
          children: [
            {
              id: '2',
              PK: false,
              name: 'field2',
              type: 'string',
            },
          ],
        },
      ];

      // Act
      const result = calculateTableHeight(fields);

      // Assert
      const expected =
        TABLE_CONST.HEADER_HEIGHT +
        TABLE_CONST.HEADER_TITLE_GAP +
        TABLE_CONST.ROW_HEIGHT +
        TABLE_CONST.ROW_PADDING;
      expect(result).toEqual(expected);
    });

    it('should return 73 when fields count is 1 and isCollapsed is true and children isCollapsed is true', () => {
      // Arrange
      const fields: FieldVm[] = [
        {
          id: '1',
          PK: true,
          name: 'field1',
          type: 'string',

          isCollapsed: true,
          children: [
            {
              id: '2',
              PK: false,
              name: 'field2',
              type: 'string',
              isCollapsed: true,
            },
          ],
        },
      ];

      // Act
      const result = calculateTableHeight(fields);

      // Assert
      const expected =
        TABLE_CONST.HEADER_HEIGHT +
        TABLE_CONST.HEADER_TITLE_GAP +
        TABLE_CONST.ROW_HEIGHT +
        TABLE_CONST.ROW_PADDING;
      expect(result).toEqual(expected);
    });
  });

  //TODO: THIS TEST MUST BE CHANGE  WHEN WE CHANGE THE CONST USE IN THE FUNCTION calculateTableHeight
  describe('calculateTableEndYPosition', () => {
    it('should return 219 when fields count is 5 and table y is 50', () => {
      // Arrange
      const table: TableVm = {
        id: '1',
        fields: [
          {
            id: '1',
            PK: true,
            name: 'field1',
            type: 'string',
          },
          {
            id: '2',
            PK: false,
            name: 'field2',
            type: 'string',
          },
          {
            id: '3',
            PK: false,
            name: 'field3',
            type: 'string',
          },
          {
            id: '4',
            PK: false,
            name: 'field4',
            type: 'string',
          },
          {
            id: '5',
            PK: false,
            name: 'field5',
            type: 'string',
          },
        ],
        tableName: 'table1',
        x: 15,
        y: 50,
      };

      // Act
      const result = calculateTableEndYPosition(table);

      // Assert
      const expected =
        TABLE_CONST.HEADER_HEIGHT +
        TABLE_CONST.HEADER_TITLE_GAP +
        TABLE_CONST.ROW_HEIGHT * 5 +
        TABLE_CONST.ROW_PADDING +
        table.y;
      expect(result).toEqual(expected);
    });

    it('should return 127 when fields count is 2 and table y is 30', () => {
      // Arrange
      const table: TableVm = {
        id: '1',
        fields: [
          {
            id: '1',
            PK: true,
            name: 'field1',
            type: 'string',
            children: [
              {
                id: '2',
                PK: false,
                name: 'field2',
                type: 'string',
              },
            ],
          },
        ],
        tableName: 'table1',
        x: 20,
        y: 30,
      };

      // Act
      const result = calculateTableEndYPosition(table);

      // Assert
      const expected =
        TABLE_CONST.HEADER_HEIGHT +
        TABLE_CONST.HEADER_TITLE_GAP +
        TABLE_CONST.ROW_HEIGHT * 2 +
        TABLE_CONST.ROW_PADDING +
        table.y;
      expect(result).toEqual(expected);
    });

    it('should return 113 when fields count is 2, the only child is collapsed and table y is 40', () => {
      // Arrange
      const table: TableVm = {
        id: '1',
        fields: [
          {
            id: '1',
            PK: true,
            name: 'field1',
            type: 'string',
            isCollapsed: true,
            children: [
              {
                id: '2',
                PK: false,
                name: 'field2',
                type: 'string',
              },
            ],
          },
        ],
        tableName: 'table1',
        x: 50,
        y: 40,
      };

      // Act
      const result = calculateTableEndYPosition(table);

      // Assert
      const expected =
        TABLE_CONST.HEADER_HEIGHT +
        TABLE_CONST.HEADER_TITLE_GAP +
        TABLE_CONST.ROW_HEIGHT +
        TABLE_CONST.ROW_PADDING +
        table.y;
      expect(result).toEqual(expected);
    });
  });

  describe('getMaxPositionYFromTables', () => {
    it('should return 0 max position y from tables', () => {
      // Arrange
      const tables: TableVm[] = [];

      // Act
      const result = getMaxPositionYFromTables(tables);

      // Assert
      expect(result).toEqual(0);
    });

    it('should return 117 max position y from tables', () => {
      // Arrange
      const tables: TableVm[] = [
        {
          id: '1',
          fields: [
            {
              id: '1',
              PK: true,
              name: 'field1',
              type: 'string',
            },
            {
              id: '2',
              PK: false,
              name: 'field2',
              type: 'string',
            },
          ],
          tableName: 'table1',
          x: 0,
          y: 20,
        },
        {
          id: '2',
          fields: [
            {
              id: '1',
              PK: true,
              name: 'field1',
              type: 'string',
            },
          ],
          tableName: 'table2',
          x: 0,
          y: 5,
        },
      ];

      // Act
      const result = getMaxPositionYFromTables(tables);

      // Assert
      const expected =
        TABLE_CONST.HEADER_HEIGHT +
        TABLE_CONST.HEADER_TITLE_GAP +
        TABLE_CONST.ROW_HEIGHT * 2 +
        TABLE_CONST.ROW_PADDING +
        tables[0].y;
      expect(result).toEqual(expected);
    });

    it('should return 102 max position y from tables', () => {
      // Arrange
      const tables: TableVm[] = [
        {
          id: '1',
          fields: [
            {
              id: '1',
              PK: true,
              name: 'field1',
              type: 'string',
            },
            {
              id: '2',
              PK: false,
              name: 'field2',
              type: 'string',
            },
          ],
          tableName: 'table1',
          x: 0,
          y: 5,
        },
        {
          id: '2',
          fields: [
            {
              id: '1',
              PK: true,
              name: 'field1',
              type: 'string',
            },
          ],
          tableName: 'table2',
          x: 0,
          y: 15,
        },
      ];

      // Act
      const result = getMaxPositionYFromTables(tables);

      // Assert
      const expected =
        TABLE_CONST.HEADER_HEIGHT +
        TABLE_CONST.HEADER_TITLE_GAP +
        TABLE_CONST.ROW_HEIGHT * 2 +
        TABLE_CONST.ROW_PADDING +
        tables[0].y;
      expect(result).toEqual(expected);
    });
  });
});
