import {
  FieldVm,
  TABLE_CONST,
  TableVm,
  NoteVm,
  NOTE_CONST,
} from '@/core/providers';
import {
  calculateTableEndYPosition,
  calculateTableHeight,
  doesTableOverlap,
  expandAllFieldsInTables,
  getFieldsCount,
  getMaxPositionXFromTables,
  getMaxPositionYFromTables,
  placeTableWithoutOverlap,
  placeAllTablesWithoutOverlap,
  getPropertyJsonSchema,
  getPropertiesJsonSchema,
  getRequiredFields,
  getSchemaScriptFromTableVm,
  getSchemaScriptFromTableVmArray,
  getMaxEndPositionXFromNotes,
  getMaxPositionYFromNotes,
  normalizeNotesForExport,
  getTotalCanvasWidthFromSchema,
  getMaxPositionYFromSchema,
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

  describe('expandAllFieldsInTables', () => {
    it('should return tables with all fields expanded with two tables', () => {
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
              children: [
                {
                  id: '2',
                  PK: false,
                  name: 'field2',
                  type: 'string',
                },
              ],
              isCollapsed: true,
            },
          ],
          tableName: 'table1',
          x: 0,
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
              children: [
                {
                  id: '2',
                  PK: false,
                  name: 'field2',
                  type: 'string',
                },
              ],
              isCollapsed: true,
            },
          ],
          tableName: 'table2',
          x: 0,
          y: 0,
        },
      ];

      // Act
      const result = expandAllFieldsInTables(tables);

      // Assert
      const expected: TableVm[] = [
        {
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
                  isCollapsed: false,
                  children: [],
                },
              ],
              isCollapsed: false,
            },
          ],
          tableName: 'table1',
          x: 0,
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
              children: [
                {
                  id: '2',
                  PK: false,
                  name: 'field2',
                  type: 'string',
                  isCollapsed: false,
                  children: [],
                },
              ],
              isCollapsed: false,
            },
          ],
          tableName: 'table2',
          x: 0,
          y: 0,
        },
      ];
      expect(result).toEqual(expected);
    });

    it('should return tables with all fields expanded with one table', () => {
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
              children: [
                {
                  id: '2',
                  PK: false,
                  name: 'field2',
                  type: 'string',
                },
              ],
              isCollapsed: true,
            },
          ],
          tableName: 'table1',
          x: 0,
          y: 0,
        },
      ];

      // Act
      const result = expandAllFieldsInTables(tables);

      // Assert
      const expected: TableVm[] = [
        {
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
                  isCollapsed: false,
                  children: [],
                },
              ],
              isCollapsed: false,
            },
          ],
          tableName: 'table1',
          x: 0,
          y: 0,
        },
      ];
      expect(result).toEqual(expected);
    });

    it('should return tables with all fields expanded with one table and one field', () => {
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
              children: [
                {
                  id: '2',
                  PK: false,
                  name: 'field2',
                  type: 'string',
                },
              ],
              isCollapsed: true,
            },
          ],
          tableName: 'table1',
          x: 0,
          y: 0,
        },
      ];

      // Act
      const result = expandAllFieldsInTables(tables);

      // Assert
      const expected: TableVm[] = [
        {
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
                  isCollapsed: false,
                  children: [],
                },
              ],
              isCollapsed: false,
            },
          ],
          tableName: 'table1',
          x: 0,
          y: 0,
        },
      ];
      expect(result).toEqual(expected);
    });

    it('should return tables with all fields expanded with one table and one field and one children', () => {
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
                    },
                  ],
                },
              ],
              isCollapsed: true,
            },
          ],
          tableName: 'table1',
          x: 0,
          y: 0,
        },
      ];

      // Act
      const result = expandAllFieldsInTables(tables);

      // Assert
      const expected: TableVm[] = [
        {
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
                  isCollapsed: false,
                  children: [
                    {
                      id: '3',
                      PK: false,
                      name: 'field3',
                      type: 'string',
                      children: [],
                      isCollapsed: false,
                    },
                  ],
                },
              ],
              isCollapsed: false,
            },
          ],
          tableName: 'table1',
          x: 0,
          y: 0,
        },
      ];
      expect(result).toEqual(expected);
    });
  });

  describe('doesTableOverlap', () => {
    it('should return false when only there is one table', () => {
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
          ],
          tableName: 'table1',
          x: 0,
          y: 0,
        },
      ];

      // Act
      const result = doesTableOverlap(tables[0], tables);

      // Assert
      expect(result).toEqual(false);
    });

    it('should return true when there are two tables and they are overlapped', () => {
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
        ],
        tableName: 'table1',
        x: 0,
        y: 0,
      };

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
          ],
          tableName: 'table1',
          x: 0,
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
          x: 0,
          y: 0,
        },
      ];

      // Act
      const result = doesTableOverlap(table, tables);

      // Assert
      expect(result).toEqual(true);
    });

    it('should return false when there are two tables and they are not overlapped', () => {
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
        ],
        tableName: 'table1',
        x: 0,
        y: 0,
      };

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
          ],
          tableName: 'table1',
          x: 0,
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
          x: 0,
          y: 100,
        },
      ];

      // Act
      const result = doesTableOverlap(table, tables);

      // Assert
      expect(result).toEqual(false);
    });

    it('should return true when there are two tables and they are overlapped with the second table, table A {x: 0, y: 100} and table B {x: 0, y: 100} ', () => {
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
        ],
        tableName: 'table1',
        x: 0,
        y: 20,
      };

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
          y: 50,
        },
      ];

      // Act
      const result = doesTableOverlap(table, tables);

      // Assert
      expect(result).toEqual(true);
    });

    it('should return true when we have 2 tables, table B is overlapped with table A has 1 children expanded, table A {x: 200, y: 0} and table B {x: 350, y: 50}', () => {
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
            isCollapsed: false,
          },
        ],
        tableName: 'table1',
        x: 200,
        y: 0,
      };

      const tables: TableVm[] = [
        {
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
              isCollapsed: false,
            },
          ],
          tableName: 'table1',
          x: 200,
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
          x: 350,
          y: 50,
        },
      ];

      // Act
      const result = doesTableOverlap(table, tables);

      // Assert
      expect(result).toEqual(true);
    });

    it('should return false when we have 2 tables, table B is overlapped with table A has 1 children expanded, table A {x: 0, y:0} table B {x:325, y: 50}', () => {
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
            isCollapsed: false,
          },
        ],
        tableName: 'table1',
        x: 0,
        y: 0,
      };

      const tables: TableVm[] = [
        {
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
              isCollapsed: false,
            },
          ],
          tableName: 'table1',
          x: 0,
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
          x: 385,
          y: 50,
        },
      ];

      // Act
      const result = doesTableOverlap(table, tables);

      // Assert
      expect(result).toEqual(false);
    });
  });

  describe('placeTableWithoutOverlap', () => {
    it('should places a table without moving if no other tables exist', () => {
      // Arrange
      const table: TableVm = {
        id: '1',
        fields: [],
        tableName: 'table1',
        x: 0,
        y: 0,
      };

      const tables: TableVm[] = [];

      // Act
      const result = placeTableWithoutOverlap(table, tables);

      // Assert
      expect(result).toEqual(table);
    });

    it('should moves a table left to avoid overlap with a single existing table', () => {
      // Arrange
      const table: TableVm = {
        id: '1',
        fields: [],
        tableName: 'table1',
        x: 800,
        y: 100,
      };

      const tables: TableVm[] = [
        {
          id: '2',
          fields: [],
          tableName: 'table2',
          x: 850,
          y: 100,
        },
      ];

      // Act
      const result = placeTableWithoutOverlap(table, tables);

      // Assert
      const expectTable: TableVm = {
        id: '1',
        fields: [],
        tableName: 'table1',
        x: 440,
        y: 100,
      };
      expect(result).toEqual(expectTable);
    });

    it('should moves a table down if moving left is not sufficient', () => {
      // Arrange
      const table: TableVm = {
        id: '1',
        fields: [],
        tableName: 'table1',
        x: 100,
        y: 100,
      };

      const tables: TableVm[] = [
        {
          id: '2',
          fields: [],
          tableName: 'table2',
          x: 85,
          y: 100,
        },
      ];

      // Act
      const result = placeTableWithoutOverlap(table, tables);

      // Assert
      const expectTable: TableVm = {
        id: '1',
        fields: [],
        tableName: 'table1',
        x: 30,
        y: 160,
      };
      expect(result).toEqual(expectTable);
    });

    it('should keeps a table within boundaries if moving would cause out-of-bounds position', () => {
      // Arrange
      const table: TableVm = {
        id: '1',
        fields: [],
        tableName: 'table1',
        x: 100,
        y: 100,
      };

      const tables: TableVm[] = Array.from(
        { length: TABLE_CONST.MAX_PLACEMENT_ATTEMPTS },
        (_, i) => ({
          id: `t${i + 1}`,
          x: 100 + i * 50,
          y: 100,
          tableName: `table${i + 1}`,
          fields: [],
        })
      );

      // Act
      const result = placeTableWithoutOverlap(table, tables);

      // Assert
      expect(result.x).toBeGreaterThanOrEqual(0);
    });

    it('should stops trying to avoid overlap after max attempts', () => {
      // Arrange
      const table: TableVm = {
        id: '1',
        fields: [],
        tableName: 'table1',
        x: 100,
        y: 100,
      };

      const tables: TableVm[] = Array.from(
        { length: TABLE_CONST.MAX_PLACEMENT_ATTEMPTS },
        (_, i) => ({
          id: `t${i + 1}`,
          x: 100,
          y: 100,
          tableName: `table${i + 1}`,
          fields: [],
        })
      );

      // Act
      const result = placeTableWithoutOverlap(table, tables);

      // Assert
      expect(result.x).toBeLessThanOrEqual(100);
    });

    it('should places multiple tables without overlap', () => {
      // Arrange
      const table: TableVm = {
        id: '1',
        fields: [],
        tableName: 'table1',
        x: 100,
        y: 100,
      };

      const tables: TableVm[] = [
        {
          id: '1',
          fields: [],
          tableName: 'table1',
          x: 100,
          y: 100,
        },
        {
          id: '2',
          fields: [],
          tableName: 'table2',
          x: 200,
          y: 100,
        },
        {
          id: '3',
          fields: [],
          tableName: 'table3',
          x: 300,
          y: 100,
        },
      ];

      // Act
      const result = placeTableWithoutOverlap(table, tables);

      // Assert
      expect(result.y).toBeGreaterThan(100);
    });

    it('should adjusts tables position to avoid overlap with multiple existing tables', () => {
      // Arrange
      const table: TableVm = {
        id: '1',
        fields: [],
        tableName: 'table1',
        x: 100,
        y: 100,
      };

      const tables: TableVm[] = [
        {
          id: '1',
          fields: [],
          tableName: 'table1',
          x: 100,
          y: 100,
        },
        {
          id: '2',
          fields: [],
          tableName: 'table2',
          x: 100,
          y: 100,
        },
        {
          id: '3',
          fields: [],
          tableName: 'table3',
          x: 100,
          y: 100,
        },
      ];

      // Act
      const result = placeTableWithoutOverlap(table, tables);

      // Assert
      expect(result.y).toBeGreaterThan(100);
    });
  });

  describe('placeAllTablesWithoutOverlap', () => {
    it('should returns an empty array when there are no tables to place', () => {
      // Arrange
      const tables: TableVm[] = [];

      // Act
      const result = placeAllTablesWithoutOverlap(tables);

      // Assert
      expect(result).toEqual([]);
    });

    it('should places all tables without overlap when given an initial set of tables', () => {
      // Arrange
      const tables: TableVm[] = [
        {
          id: '1',
          fields: [],
          tableName: 'table1',
          x: 100,
          y: 100,
        },
        {
          id: '2',
          fields: [],
          tableName: 'table2',
          x: 150,
          y: 100,
        },
        {
          id: '3',
          fields: [],
          tableName: 'table3',
          x: 200,
          y: 100,
        },
      ];

      // Act
      const result = placeAllTablesWithoutOverlap(tables);

      // Assert
      result.forEach((table, index) => {
        for (let i = 0; i < result.length; i++) {
          if (i !== index) {
            const isOverlapping = !(
              table.x >= result[i].x + TABLE_CONST.DEFAULT_TABLE_WIDTH ||
              table.x + TABLE_CONST.DEFAULT_TABLE_WIDTH <= result[i].x ||
              table.y >= result[i].y + TABLE_CONST.ROW_HEIGHT ||
              table.y + TABLE_CONST.ROW_HEIGHT <= result[i].y
            );
            expect(isOverlapping).toBe(false);
          }
        }
      });
    });

    it('should properly adjusts tables to avoid overlap in complex scenarios', () => {
      // Arrange
      const tables: TableVm[] = [
        {
          id: '1',
          fields: [],
          tableName: 'table1',
          x: 100,
          y: 100,
        },
        {
          id: '2',
          fields: [],
          tableName: 'table2',
          x: 150,
          y: 100,
        },
        {
          id: '3',
          fields: [],
          tableName: 'table3',
          x: 200,
          y: 100,
        },
        {
          id: '4',
          fields: [],
          tableName: 'table4',
          x: 250,
          y: 100,
        },
        {
          id: '5',
          fields: [],
          tableName: 'table5',
          x: 300,
          y: 100,
        },
        {
          id: '6',
          fields: [],
          tableName: 'table6',
          x: 100,
          y: 150,
        },
        {
          id: '7',
          fields: [],
          tableName: 'table7',
          x: 150,
          y: 150,
        },
      ];

      // Act
      const result = placeAllTablesWithoutOverlap(tables);
      

      // Assert
      result.forEach((table, index) => {
        for (let i = 0; i < result.length; i++) {
          if (i !== index) {
            const isOverlapping = !(
              table.x >= result[i].x + TABLE_CONST.DEFAULT_TABLE_WIDTH ||
              table.x + TABLE_CONST.DEFAULT_TABLE_WIDTH <= result[i].x ||
              table.y >= result[i].y + TABLE_CONST.ROW_HEIGHT ||
              table.y + TABLE_CONST.ROW_HEIGHT <= result[i].y
            );
            expect(isOverlapping).toBe(false);
          }
        }
      });
    });

    it('Wide tables shouldnt be on the left border overlapping other tables after relocating. ', () => {
      // Arrange
      const tables: TableVm[] = [
        {
          id: '1',
          fields: [
            { id: '1', PK: true, name: 'campo1', type: 'string', children: [], isCollapsed: false, isArray: false},
            { id: '2', PK: true, name: 'campo2', type: 'string', children: [], isCollapsed: false, isArray: false},
            { id: '3', PK: true, name: 'campo3', type: 'string', children: [], isCollapsed: false, isArray: false},
            { id: '4', PK: true, name: 'campo4', type: 'string', children: [], isCollapsed: false, isArray: false},
            { id: '5', PK: true, name: 'campo5', type: 'string', children: [], isCollapsed: false, isArray: false},
            { id: '6', PK: true, name: 'campo6', type: 'string', children: [], isCollapsed: false, isArray: false},
            { id: '7', PK: true, name: 'campo7', type: 'string', children: [], isCollapsed: false, isArray: false},
          ],
          tableName: 'table1',
          x: 100,
          y: 300
        },
        {
          id: '2',
          fields: [
            { id: '1', PK: true, name: 'campo1', type: 'string', children: [], isCollapsed: false, isArray: false},
            { id: '2', PK: true, name: 'campo2', type: 'string', children: [], isCollapsed: false, isArray: false},
            { id: '3', PK: true, name: 'campo3', type: 'string', children: [], isCollapsed: false, isArray: false},
            { id: '4', PK: true, name: 'campo4', type: 'string', children: [], isCollapsed: false, isArray: false},
            { id: '5', PK: true, name: 'campo5', type: 'string', children: [], isCollapsed: false, isArray: false},
            { id: '6', PK: true, name: 'campo6', type: 'string', children: [], isCollapsed: false, isArray: false},
            { id: '7', PK: true, name: 'campo7', type: 'string', children: [], isCollapsed: false, isArray: false},
            { id: '8', PK: true, name: 'campo8', type: 'string', children: [], isCollapsed: false, isArray: false},
            { id: '9', PK: true, name: 'campo9', type: 'string', children: [], isCollapsed: false, isArray: false},
            { id: '10', PK: true, name: 'campo10', type: 'string', children: [], isCollapsed: false, isArray: false},
            { id: '11', PK: true, name: 'campo11', type: 'string', children: [], isCollapsed: false, isArray: false},
            { id: '12', PK: true, name: 'campo12', type: 'string', children: [], isCollapsed: false, isArray: false},
            { id: '13', PK: true, name: 'campo13', type: 'string', children: [], isCollapsed: false, isArray: false},
            { id: '14', PK: true, name: 'campo14', type: 'string', children: [], isCollapsed: false, isArray: false},
            { id: '15', PK: true, name: 'campo15', type: 'string', children: [], isCollapsed: false, isArray: false},
            { id: '16', PK: true, name: 'campo16', type: 'string', children: [], isCollapsed: false, isArray: false},
            { id: '17', PK: true, name: 'campo17', type: 'string', children: [], isCollapsed: false, isArray: false},
            { id: '18', PK: true, name: 'campo18', type: 'string', children: [], isCollapsed: false, isArray: false},
            { id: '19', PK: true, name: 'campo19', type: 'string', children: [], isCollapsed: false, isArray: false},
            { id: '20', PK: true, name: 'campo20', type: 'string', children: [], isCollapsed: false, isArray: false},
            { id: '21', PK: true, name: 'campo21', type: 'string', children: [], isCollapsed: false, isArray: false},
            { id: '22', PK: true, name: 'campo22', type: 'string', children: [], isCollapsed: false, isArray: false},
          ],
          tableName: 'table2',
          x: 450,
          y: 100,
          width: 780
        },
        {
          id: '3',
          fields: [],
          tableName: 'table3',
          x: 1200,
          y: 700
        },
        {
          id: '4',
          fields: [],
          tableName: 'table4',
          x: 1500,
          y: 100
        },
         {
          id: '5',
          fields: [],
          tableName: 'table5',
          x: 300,
          y: 100,
        },
        {
          id: '6',
          fields: [],
          tableName: 'table6',
          x: 100,
          y: 150,
        },
        {
          id: '7',
          fields: [],
          tableName: 'table7',
          x: 150,
          y: 150,
        },
      ];

      // Act
      const result = placeAllTablesWithoutOverlap(tables);
      

      // Assert
      result.forEach((table, index) => {
        const tableWidth = table.width ?? TABLE_CONST.DEFAULT_TABLE_WIDTH;
        const tableHeight = calculateTableHeight(table.fields);
        for (let i = 0; i < result.length; i++) {
          if (i !== index) {
          const iWidth = result[i].width ?? TABLE_CONST.DEFAULT_TABLE_WIDTH;
          const iHeight = calculateTableHeight(result[i].fields);

            const isOverlapping = !(
              table.x >= result[i].x + iWidth ||
              table.x + tableWidth <= result[i].x ||
              table.y >= result[i].y + iHeight ||
              table.y + tableHeight <= result[i].y 
            );
                        
            const hasBadPosition = (isOverlapping) && 
              (table.x <= TABLE_CONST.TABLE_SHIFT_DISTANCE) &&
              (tableWidth > TABLE_CONST.DEFAULT_TABLE_WIDTH);

            expect(hasBadPosition).toBe(false);
          }
        }
      });
    });  
  });
});

describe('getPropertyJsonSchema', () => {
  it('should generate json schema for non-array field', () => {
    //Arrange
    const field: FieldVm = {
      id: '1',
      PK: false,
      name: 'fieldName',
      type: 'string',
    };

    //Act
    const result = getPropertyJsonSchema(field);

    //Assert
    expect(result).toBe('"fieldName": { bsonType: "string" }');
  });
});



describe('getPropertyJsonSchema', () => {
  it('should generate json schema for non-array field', () => {
    //Arrange
    const field: FieldVm = {
      id: '1',
      PK: false,
      name: 'fieldName',
      type: 'string',
    };

    //Act
    const result = getPropertyJsonSchema(field);

    //Assert
    expect(result).toBe('"fieldName": { bsonType: "string" }');
  });


  it('should generate json schema for array field', () => {
    //Arrange
    const field: FieldVm = {
      id: 'some-id',
      PK: false,
      name: 'fieldName',
      type: 'string',
      isArray: true,
    };

    //Act
    const result = getPropertyJsonSchema(field);

    //Assert
    expect(result).toBe(
      '"fieldName": { bsonType: "array", items: { bsonType: "string" } }'
    );
  });

  it('should generate JSON schema for a subdocument property', () => {
    // Arrange
    const field: FieldVm = {
      id: 'subdocumentId',
      PK: false,
      name: 'subdocumentField',
      type: 'object',
      children: [
        { id: 'childId1', PK: false, name: 'childField1', type: 'string' },
        { id: 'childId2', PK: false, name: 'childField2', type: 'decimal' },
      ],
    };

    // Act
    const result = getPropertyJsonSchema(field);

    // Assert
    const expectedSchema = `"subdocumentField": { bsonType: "object", title: "subdocumentField", properties: { "childField1": { bsonType: "string" }, "childField2": { bsonType: "decimal" }, }, }`;
    expect(result).toEqual(expectedSchema);
  });
});

describe('getPropertiesJsonSchema', () => {
  it('should generate json schema for multiple fields', () => {
    //Arrange
    const fields: FieldVm[] = [
      {
        id: 'id1',
        PK: false,
        name: 'field1',
        type: 'string',
      },
      {
        id: 'id2',
        PK: false,
        name: 'field2',
        type: 'string',
      },
    ];

    //Act
    const result = getPropertiesJsonSchema(fields);

    //Assert
    expect(result).toEqual(
      '"field1": { bsonType: "string" },\n        "field2": { bsonType: "string" }'
    );
  });
});

describe('getRequiredFields', () => {
  it('should return an empty string when no fields have isNN set to true', () => {
    //Arrange
    const fields: FieldVm[] = [
      { id: 'id1', PK: false, name: 'field1', type: 'string', isNN: true },
      { id: 'id2', PK: false, name: 'field2', type: 'enum', isNN: false },
    ];

    //Act
    const result = getRequiredFields(fields);

    //Assert
    expect(result).toBe('"field1"');
  });
});

describe('getSchemaScriptFromTableVm', () => {
  it('should generate schema script for a table with fields', () => {
    //Arrange
    const table: TableVm = {
      id: 'tableId',
      x: 10,
      y: 20,
      tableName: 'Table',
      fields: [
        { id: 'id1', PK: false, name: 'field1', type: 'string', isNN: true },
        { id: 'id2', PK: false, name: 'field2', type: 'decimal', isNN: false },
        { id: 'id3', PK: false, name: 'field3', type: 'bool', isNN: true },
      ],
    };
    //Act
    const result = getSchemaScriptFromTableVm(table);

    //Assert
    const expectedScript = `db.createCollection("Table", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "Table",
      required: ["field1", "field3"],
      properties: {
        "field1": { bsonType: "string" },
        "field2": { bsonType: "decimal" },
        "field3": { bsonType: "bool" },
      },
    },
  },
});`;

    expect(result).toEqual(expectedScript);
  });
});

describe('getSchemaScriptFromTableVmArray', () => {
  it('should generate schema scripts for an array of tables', () => {
    //Arrange
    const tables: TableVm[] = [
      {
        id: 'tableId2',
        x: 30,
        y: 40,
        tableName: 'Table',
        fields: [
          { id: 'id3', PK: false, name: 'field3', type: 'bool', isNN: true },
          {
            id: 'id4',
            PK: false,
            name: 'field4',
            type: 'decimal',
            isNN: false,
          },
        ],
      },
      {
        id: 'tableId3',
        x: 10,
        y: 20,
        tableName: 'Table1',
        fields: [
          { id: 'id1', PK: false, name: 'field1', type: 'bool', isNN: true },
          {
            id: 'id2',
            PK: false,
            name: 'field2',
            type: 'decimal',
            isNN: false,
          },
        ],
      },
    ];

    //Act
    const result = getSchemaScriptFromTableVmArray(tables);

    //Assert
    const expectedScript = `db.createCollection("Table", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "Table",
      required: ["field3"],
      properties: {
        "field3": { bsonType: "bool" },
        "field4": { bsonType: "decimal" },
      },
    },
  },
});

db.createCollection("Table1", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "Table1",
      required: ["field1"],
      properties: {
        "field1": { bsonType: "bool" },
        "field2": { bsonType: "decimal" },
      },
    },
  },
});`;

    expect(result).toEqual(expectedScript);
  });
});

describe('Note Export Functions', () => {
  describe('getMaxEndPositionXFromNotes', () => {
    it('should return 0 when notes array is empty', () => {
      // Arrange
      const notes: NoteVm[] = [];

      // Act
      const result = getMaxEndPositionXFromNotes(notes);

      // Assert
      expect(result).toEqual(0);
    });

    it('should return the rightmost X position of a single note', () => {
      // Arrange
      const notes: NoteVm[] = [
        {
          id: '1',
          title: 'Note 1',
          description: 'Test description',
          x: 100,
          y: 50,
          width: 240,
          height: 150,
        },
      ];

      // Act
      const result = getMaxEndPositionXFromNotes(notes);

      // Assert
      expect(result).toEqual(340);
    });

    it('should return the rightmost X position from multiple notes', () => {
      // Arrange
      const notes: NoteVm[] = [
        {
          id: '1',
          title: 'Note 1',
          description: 'Test description',
          x: 100,
          y: 50,
          width: 240,
          height: 150,
        },
        {
          id: '2',
          title: 'Note 2',
          description: 'Test description',
          x: 400,
          y: 100,
          width: 240,
          height: 150,
        },
      ];

      // Act
      const result = getMaxEndPositionXFromNotes(notes);

      // Assert
      expect(result).toEqual(640);
    });

    it('should use default width when note width is undefined', () => {
      // Arrange
      const notes: NoteVm[] = [
        {
          id: '1',
          title: 'Note 1',
          description: 'Test description',
          x: 100,
          y: 50,
          width: NOTE_CONST.DEFAULT_NOTE_WIDTH,
          height: 150,
        },
      ];

      // Act
      const result = getMaxEndPositionXFromNotes(notes);

      // Assert
      expect(result).toEqual(100 + NOTE_CONST.DEFAULT_NOTE_WIDTH);
    });
  });

  describe('getMaxPositionYFromNotes', () => {
    it('should return 0 when notes array is empty', () => {
      // Arrange
      const notes: NoteVm[] = [];

      // Act
      const result = getMaxPositionYFromNotes(notes);

      // Assert
      expect(result).toEqual(0);
    });

    it('should return the bottommost Y position of a single note', () => {
      // Arrange
      const notes: NoteVm[] = [
        {
          id: '1',
          title: 'Note 1',
          description: 'Short note',
          x: 100,
          y: 50,
          width: 240,
          height: 150,
        },
      ];

      // Act
      const result = getMaxPositionYFromNotes(notes);

      // Assert
      expect(result).toBeGreaterThan(50);
    });

    it('should return the bottommost Y position from multiple notes', () => {
      // Arrange
      const notes: NoteVm[] = [
        {
          id: '1',
          title: 'Note 1',
          description: 'Short note',
          x: 100,
          y: 50,
          width: 240,
          height: 150,
        },
        {
          id: '2',
          title: 'Note 2',
          description: 'Another short note',
          x: 400,
          y: 200,
          width: 240,
          height: 150,
        },
      ];

      // Act
      const result = getMaxPositionYFromNotes(notes);

      // Assert
      expect(result).toBeGreaterThan(200);
    });

    it('should handle notes with long descriptions', () => {
      // Arrange
      const longDescription =
        'This is a very long note description that will span multiple lines and should result in a taller note height when calculated.';
      const notes: NoteVm[] = [
        {
          id: '1',
          title: 'Note 1',
          description: longDescription,
          x: 100,
          y: 50,
          width: 240,
          height: 300,
        },
      ];

      // Act
      const result = getMaxPositionYFromNotes(notes);

      // Assert
      expect(result).toBeGreaterThan(50);
    });
  });

  describe('normalizeNotesForExport', () => {
    it('should return empty array when notes array is empty', () => {
      // Arrange
      const notes: NoteVm[] = [];
      const offsetX = 100;

      // Act
      const result = normalizeNotesForExport(notes, offsetX);

      // Assert
      expect(result).toEqual([]);
    });

    it('should adjust X position of a single note by offsetX', () => {
      // Arrange
      const notes: NoteVm[] = [
        {
          id: '1',
          title: 'Note 1',
          description: 'Test description',
          x: 50,
          y: 100,
          width: 240,
          height: 150,
        },
      ];
      const offsetX = 100;

      // Act
      const result = normalizeNotesForExport(notes, offsetX);

      // Assert
      expect(result[0].x).toEqual(150);
      expect(result[0].y).toEqual(100);
    });

    it('should adjust X positions of multiple notes by offsetX', () => {
      // Arrange
      const notes: NoteVm[] = [
        {
          id: '1',
          title: 'Note 1',
          description: 'Test description',
          x: 50,
          y: 100,
          width: 240,
          height: 150,
        },
        {
          id: '2',
          title: 'Note 2',
          description: 'Test description',
          x: 300,
          y: 150,
          width: 240,
          height: 150,
        },
      ];
      const offsetX = 100;

      // Act
      const result = normalizeNotesForExport(notes, offsetX);

      // Assert
      expect(result[0].x).toEqual(150);
      expect(result[1].x).toEqual(400);
      expect(result[0].y).toEqual(100);
      expect(result[1].y).toEqual(150);
    });

    it('should handle negative offsetX', () => {
      // Arrange
      const notes: NoteVm[] = [
        {
          id: '1',
          title: 'Note 1',
          description: 'Test description',
          x: 200,
          y: 100,
          width: 240,
          height: 150,
        },
      ];
      const offsetX = -50;

      // Act
      const result = normalizeNotesForExport(notes, offsetX);

      // Assert
      expect(result[0].x).toEqual(150);
    });
  });

  describe('getTotalCanvasWidthFromSchema', () => {
    it('should return 0 when both tables and notes are empty', () => {
      // Arrange
      const tables: TableVm[] = [];
      const notes: NoteVm[] = [];

      // Act
      const result = getTotalCanvasWidthFromSchema(tables, notes);

      // Assert
      expect(result).toEqual(0);
    });

    it('should return table width when no notes exist', () => {
      // Arrange
      const tables: TableVm[] = [
        {
          id: '1',
          fields: [],
          tableName: 'table1',
          x: 100,
          y: 100,
        },
      ];
      const notes: NoteVm[] = [];

      // Act
      const result = getTotalCanvasWidthFromSchema(tables, notes);

      // Assert
      expect(result).toBeGreaterThan(0);
    });

    it('should return note width when no tables exist', () => {
      // Arrange
      const tables: TableVm[] = [];
      const notes: NoteVm[] = [
        {
          id: '1',
          title: 'Note 1',
          description: 'Test',
          x: 100,
          y: 100,
          width: 240,
          height: 150,
        },
      ];

      // Act
      const result = getTotalCanvasWidthFromSchema(tables, notes);

      // Assert
      expect(result).toEqual(340);
    });

    it('should return the maximum width when both tables and notes exist', () => {
      // Arrange
      const tables: TableVm[] = [
        {
          id: '1',
          fields: [],
          tableName: 'table1',
          x: 100,
          y: 100,
        },
      ];
      const notes: NoteVm[] = [
        {
          id: '1',
          title: 'Note 1',
          description: 'Test',
          x: 500,
          y: 100,
          width: 240,
          height: 150,
        },
      ];

      // Act
      const result = getTotalCanvasWidthFromSchema(tables, notes);

      // Assert
      expect(result).toBeGreaterThan(0);
    });
  });

  describe('getMaxPositionYFromSchema', () => {
    it('should return 0 when both tables and notes are empty', () => {
      // Arrange
      const tables: TableVm[] = [];
      const notes: NoteVm[] = [];

      // Act
      const result = getMaxPositionYFromSchema(tables, notes);

      // Assert
      expect(result).toEqual(0);
    });

    it('should return table height when no notes exist', () => {
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
          ],
          tableName: 'table1',
          x: 100,
          y: 100,
        },
      ];
      const notes: NoteVm[] = [];

      // Act
      const result = getMaxPositionYFromSchema(tables, notes);

      // Assert
      expect(result).toBeGreaterThan(100);
    });

    it('should return note height when no tables exist', () => {
      // Arrange
      const tables: TableVm[] = [];
      const notes: NoteVm[] = [
        {
          id: '1',
          title: 'Note 1',
          description: 'Test description',
          x: 100,
          y: 100,
          width: 240,
          height: 150,
        },
      ];

      // Act
      const result = getMaxPositionYFromSchema(tables, notes);

      // Assert
      expect(result).toBeGreaterThan(100);
    });

    it('should return the maximum height when both tables and notes exist', () => {
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
          ],
          tableName: 'table1',
          x: 100,
          y: 50,
        },
      ];
      const notes: NoteVm[] = [
        {
          id: '1',
          title: 'Note 1',
          description: 'Test description',
          x: 100,
          y: 300,
          width: 240,
          height: 150,
        },
      ];

      // Act
      const result = getMaxPositionYFromSchema(tables, notes);

      // Assert
      expect(result).toBeGreaterThan(300);
    });
  });
});
