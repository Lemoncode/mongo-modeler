/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  removeField,
  doMapOrCreateTable,
  updateFieldValueLogic,
} from './edit-table.business';
import { TableVm } from './edit-table.vm';
import * as canvasVm from '@/core/providers/canvas-schema';
import { GUID } from '@/core/model';
import { vi } from 'vitest';
import * as editTableVm from './edit-table.vm';

describe('edit-table.business', () => {
  describe('edit table - removeField function', () => {
    it('should return the same table if the fields is an empty array', () => {
      // Arrange
      const fieldIdToRemove: GUID = '3';

      const table: TableVm = {
        id: '1',
        fields: [],

        tableName: 'table1',
        x: 0,
        y: 0,
      };

      // Act
      const result: TableVm = removeField(table, fieldIdToRemove);

      // Assert
      expect(result).toEqual(table);
    });

    it('should remove the specified field and its children from the table ', () => {
      // Arrange
      const fieldIdToRemove: GUID = '2';

      const table: TableVm = {
        id: '1',
        fields: [
          {
            id: '1',
            PK: true,
            FK: false,
            name: 'field1',
            type: 'string',
            children: [],
            isCollapsed: false,
          },
          {
            id: '2',
            PK: true,
            FK: false,
            name: 'field2',
            type: 'string',
            children: [
              {
                id: '3',
                PK: true,
                FK: false,
                name: 'child1 field2',
                type: 'string',
                children: [],
                isCollapsed: false,
              },
            ],
            isCollapsed: false,
          },
        ],

        tableName: 'table1',
        x: 0,
        y: 0,
      };

      const expectedTable: TableVm = {
        id: '1',
        fields: [
          {
            id: '1',
            PK: true,
            FK: false,
            name: 'field1',
            type: 'string',
            children: [],
            isCollapsed: false,
          },
        ],

        tableName: 'table1',
        x: 0,
        y: 0,
      };

      // Act
      const result: TableVm = removeField(table, fieldIdToRemove);

      // Assert
      expect(result).toEqual(expectedTable);
    });

    it('should remove the specified child', () => {
      // Arrange
      const fieldIdToRemove: GUID = '3';

      const table: TableVm = {
        id: '1',
        fields: [
          {
            id: '2',
            PK: true,
            FK: false,
            name: 'field2',
            type: 'string',
            children: [
              {
                id: '3',
                PK: true,
                FK: false,
                name: 'child1 field2',
                type: 'string',
                children: [],
                isCollapsed: false,
              },
            ],
            isCollapsed: false,
          },
        ],

        tableName: 'table1',
        x: 0,
        y: 0,
      };

      const expectedTable: TableVm = {
        id: '1',
        fields: [
          {
            id: '2',
            PK: true,
            FK: false,
            name: 'field2',
            type: 'string',
            children: [],
            isCollapsed: false,
          },
        ],

        tableName: 'table1',
        x: 0,
        y: 0,
      };

      // Act
      const result: TableVm = removeField(table, fieldIdToRemove);

      // Assert
      expect(result).toEqual(expectedTable);
      expect(result.fields[0].children).toStrictEqual([]);
    });

    it('should not remove any field and return the same table if the fieldIdToRemove is not found', () => {
      // Arrange
      const fieldIdToRemove: GUID = '4';

      const table: TableVm = {
        id: '1',
        fields: [
          {
            id: '1',
            PK: true,
            FK: false,
            name: 'field1',
            type: 'string',
            children: [],
            isCollapsed: false,
          },
          {
            id: '2',
            PK: true,
            FK: false,
            name: 'field2',
            type: 'string',
            children: [],
            isCollapsed: false,
          },
        ],

        tableName: 'table1',
        x: 0,
        y: 0,
      };

      // Act
      const result: TableVm = removeField(table, fieldIdToRemove);

      // Assert
      expect(result).toEqual(table);
    });
  });

  describe('doMapOrCreateTable', () => {
    const { createDefaultTableMock } = vi.hoisted(() => {
      return { createDefaultTableMock: vi.fn() };
    });
    vi.mock('./edit-table.vm.ts', () => {
      return { createDefaultTable: createDefaultTableMock };
    });

    it('Should return mapped table when there is a table', () => {
      // Arrange
      const table: canvasVm.TableVm = {
        id: '2',
        fields: [
          {
            id: '1',
            PK: true,
            name: '_id',
            type: 'objectId',
            children: [],
          },
        ],
        tableName: 'ProductA',
        x: 15,
        y: 15,
      };

      const relation: canvasVm.RelationVm[] = [
        {
          id: '21',
          fromTableId: '1',
          toTableId: '42',
          fromFieldId: '1',
          toFieldId: '31',
          type: '1:M',
        },
      ];

      const expectedResult: TableVm = {
        id: '2',
        fields: [
          {
            id: '1',
            PK: true,
            FK: false,
            name: '_id',
            type: 'objectId',
            children: [],
          },
        ],
        tableName: 'ProductA',
        x: 15,
        y: 15,
      };

      // Act
      const result = doMapOrCreateTable(relation, table);

      // Assert
      expect(result).toEqual(expectedResult);
    });
    it('Should return default table when there is not a table', () => {
      // Arrange
      const relation: canvasVm.RelationVm[] = [
        {
          id: '21',
          fromTableId: '1',
          toTableId: '42',
          fromFieldId: '1',
          toFieldId: '31',
          type: '1:M',
        },
      ];

      const expectedResult: TableVm = {
        id: '2',
        fields: [
          {
            id: '2',
            PK: true,
            FK: false,
            name: '_id',
            type: 'objectId',
          },
        ],
        tableName: 'New Table',
        x: 0,
        y: 0,
      };

      // Act
      createDefaultTableMock.mockReturnValue({
        id: '2',
        fields: [
          {
            id: '2',
            PK: true,
            FK: false,
            name: '_id',
            type: 'objectId',
          },
        ],
        tableName: 'New Table',
        x: 0,
        y: 0,
      });

      const result = doMapOrCreateTable(relation);

      // Assert

      expect(result).toEqual(expectedResult);
    });
    it('Should return default table when is undefined table', () => {
      // Arrange
      const table = undefined;

      const relation: canvasVm.RelationVm[] = [
        {
          id: '21',
          fromTableId: '1',
          toTableId: '42',
          fromFieldId: '1',
          toFieldId: '31',
          type: '1:M',
        },
      ];

      const expectedResult: TableVm = {
        id: '3',
        fields: [
          {
            id: '2',
            PK: true,
            FK: false,
            name: '_id',
            type: 'objectId',
          },
        ],
        tableName: 'New Table',
        x: 0,
        y: 0,
      };

      // Act
      createDefaultTableMock.mockReturnValue({
        id: '3',
        fields: [
          {
            id: '2',
            PK: true,
            FK: false,
            name: '_id',
            type: 'objectId',
          },
        ],
        tableName: 'New Table',
        x: 0,
        y: 0,
      });

      const result = doMapOrCreateTable(relation, table);

      // Assert

      expect(result).toEqual(expectedResult);
    });
  });
});

describe('edit table - updateFieldValueLogic function', () => {
  it('should return expected result when IDs match', () => {
    // Arrange
    const table: editTableVm.TableVm = {
      fields: [
        {
          id: '1',
          PK: false,
          FK: true,
          name: 'fieldName',
          type: 'string',
        },
      ],
      id: '1',
      tableName: 'tableName',
      x: 7,
      y: 10,
    };
    const fieldUpdate: editTableVm.FieldVm = {
      id: '1',
      PK: false,
      FK: true,
      name: 'fieldName',
      type: 'string',
    };
    const expectedResult: editTableVm.TableVm = {
      fields: [
        {
          id: '1',
          PK: false,
          FK: true,
          name: 'newName',
          type: 'string',
        },
      ],
      id: '1',
      tableName: 'tableName',
      x: 7,
      y: 10,
    };

    //Act
    const result = updateFieldValueLogic(table, {
      fieldToUpdate: fieldUpdate,
      key: 'name',
      value: 'newName',
    });
    //Assert
    expect(result).toEqual(expectedResult);
  });
  it('should not update if IDs don`t match', () => {
    //Arrange
    const table: editTableVm.TableVm = {
      fields: [
        {
          id: '1',
          PK: false,
          FK: true,
          name: 'fieldName',
          type: 'string',
        },
      ],
      id: '1',
      tableName: 'tableName',
      x: 7,
      y: 10,
    };
    const fieldUpdate: editTableVm.FieldVm = {
      id: '2',
      PK: false,
      FK: true,
      name: 'fieldName',
      type: 'string',
    };

    const expectedResult: editTableVm.TableVm = {
      fields: [
        {
          id: '1',
          PK: false,
          FK: true,
          name: 'fieldName',
          type: 'string',
        },
      ],
      id: '1',
      tableName: 'tableName',
      x: 7,
      y: 10,
    };

    //Act
    const result = updateFieldValueLogic(table, {
      fieldToUpdate: fieldUpdate,
      key: 'name',
      value: 'newName',
    });
    //Assert
    expect(result).toEqual(expectedResult);
  });
  it('should return children equal undefined when value is not an object', () => {
    //Arrange
    const table: editTableVm.TableVm = {
      fields: [
        {
          id: '1',
          PK: false,
          FK: true,
          name: 'fieldName',
          type: 'object',
        },
      ],
      id: '1',
      tableName: 'tableName',
      x: 7,
      y: 10,
    };
    const fieldUpdate: editTableVm.FieldVm = {
      id: '1',
      PK: false,
      FK: true,
      name: 'newName',
      type: 'object',
    };

    const expectedResult: editTableVm.TableVm = {
      fields: [
        {
          id: '1',
          PK: false,
          FK: true,
          name: 'fieldName',
          type: 'string',
          children: undefined,
        },
      ],
      id: '1',
      tableName: 'tableName',
      x: 7,
      y: 10,
    };
    //Act
    const result = updateFieldValueLogic(table, {
      fieldToUpdate: fieldUpdate,
      key: 'type',
      value: 'string',
    });

    //Assert
    expect(result).toEqual(expectedResult);
  });
  it('should return children updated when value is an object', () => {
    //Arrange
    const table: editTableVm.TableVm = {
      fields: [
        {
          id: '1',
          PK: false,
          FK: true,
          name: 'fieldName',
          type: 'object',
          children: [
            {
              id: '2',
              name: 'tableName',
              PK: true,
              FK: false,
              type: 'string',
            },
          ],
        },
      ],
      id: '3',
      tableName: 'tableName',
      x: 7,
      y: 10,
    };

    const fieldUpdate: editTableVm.FieldVm = {
      id: '1',
      PK: false,
      FK: true,
      name: 'fieldName',
      type: 'object',
      children: [
        {
          id: '2',
          name: 'newTableName',
          PK: true,
          FK: false,
          type: 'string',
        },
      ],
    };

    const expectedResult: editTableVm.TableVm = {
      fields: [
        {
          id: '1',
          PK: false,
          FK: true,
          name: 'fieldName',
          type: 'object',
          children: [
            {
              id: '2',
              name: 'newTableName',
              PK: true,
              FK: false,
              type: 'string',
            },
          ],
        },
      ],
      id: '3',
      tableName: 'tableName',
      x: 7,
      y: 10,
    };
    //Act
    const result = updateFieldValueLogic(table, {
      fieldToUpdate: fieldUpdate,
      key: 'children',
      value: [
        {
          id: '2',
          name: 'newTableName',
          PK: true,
          FK: false,
          type: 'string',
        },
      ],
    });
    //Assert
    expect(result).toEqual(expectedResult);
  });
  it('should not update if children IDs don`t match', () => {
    //Arrange
    const table: editTableVm.TableVm = {
      fields: [
        {
          id: '1',
          PK: false,
          FK: true,
          name: 'fieldName',
          type: 'object',
          children: [
            {
              id: '2',
              name: 'tableName',
              PK: true,
              FK: false,
              type: 'string',
            },
          ],
        },
      ],
      id: '3',
      tableName: 'tableName',
      x: 7,
      y: 10,
    };

    const fieldUpdate: editTableVm.FieldVm = {
      id: '4',
      name: 'newTableName',
      PK: true,
      FK: false,
      type: 'string',
    };

    const expectedResult: editTableVm.TableVm = {
      fields: [
        {
          id: '1',
          PK: false,
          FK: true,
          name: 'fieldName',
          type: 'object',
          children: [
            {
              id: '2',
              name: 'tableName',
              PK: true,
              FK: false,
              type: 'string',
            },
          ],
        },
      ],
      id: '3',
      tableName: 'tableName',
      x: 7,
      y: 10,
    };
    //Act
    const result = updateFieldValueLogic(table, {
      fieldToUpdate: fieldUpdate,
      key: 'children',
      value: [fieldUpdate],
    });
    //Assert
    expect(result).toEqual(expectedResult);
  });
});
