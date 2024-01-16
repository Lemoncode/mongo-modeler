/* eslint-disable @typescript-eslint/no-explicit-any */
import { produce } from 'immer';
import { removeField, removeFieldRecursive } from './edit-table.business';
import { FieldVm, TableVm } from './edit-table.vm';
import { GUID } from '@/core/model';
import { vi } from 'vitest';

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

beforeEach(() => {
  vi.clearAllMocks();
});

vi.mock('./edit-table.business', async () => {
  const actual = await vi.importActual('./edit-table.business');

  const mockedRemoveField = (table: TableVm, fieldId: GUID): TableVm => {
    return produce(table, draftTable => {
      mockedRemoveFieldRecursive(draftTable.fields, fieldId);
    });
  };

  const mockedRemoveFieldRecursive = vi.fn(
    (fields: FieldVm[], fieldId: GUID): void => {
      for (let i = 0; i < fields.length; i++) {
        if (fields[i].id === fieldId) {
          fields.splice(i, 1);
          return; // Exit early if the field is found and has been removed
        }
        if (fields[i].children) {
          mockedRemoveFieldRecursive(fields[i].children ?? [], fieldId);
        }
      }
    }
  );

  return {
    ...actual,
    removeField: mockedRemoveField,
    removeFieldRecursive: mockedRemoveFieldRecursive,
  };
});

describe('edit table - removeField function', () => {
  it('should remove the specified field and its children from the table ', () => {
    // Arrange
    const fieldIdToRemove: GUID = '2';

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

    expect(typeof result).toBe('object');
    expect(result.fields.some(field => field.id === fieldIdToRemove)).toBe(
      false
    );
  });

  it('should remove the specified child', () => {
    // Arrange
    const fieldIdToRemove: GUID = '3';

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
    expect(result.fields[1].children).toStrictEqual([]);

    expect(typeof result).toBe('object');
    expect(result.fields.some(field => field.id === fieldIdToRemove)).toBe(
      false
    );
  });

  it('should not remove any field', () => {
    // Arrange
    const fieldIdToRemove: GUID = '4';

    // Act
    const result: TableVm = removeField(table, fieldIdToRemove);

    // Assert
    expect(result).toEqual(table);

    expect(typeof result).toBe('object');
    expect(result.fields.some(field => field.id === fieldIdToRemove)).toBe(
      false
    );
  });

  it('should call removeFieldRecursive when field has children', async () => {
    // Arrange
    const fieldIdToRemove: GUID = '3';

    // Act
    removeField(table, fieldIdToRemove);

    // Assert
    expect(removeFieldRecursive).toHaveBeenCalled();
    expect(removeFieldRecursive).toHaveBeenCalledTimes(3); //the first for id=1, the second for id=2 (has children) then a third time recursively
  });
});
