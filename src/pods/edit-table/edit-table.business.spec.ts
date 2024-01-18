/* eslint-disable @typescript-eslint/no-explicit-any */
import { removeField } from './edit-table.business';
import { TableVm } from './edit-table.vm';
import { GUID } from '@/core/model';

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
