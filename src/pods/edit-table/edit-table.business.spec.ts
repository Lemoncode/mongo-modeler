/* eslint-disable @typescript-eslint/no-explicit-any */
import { updateFieldValueLogic, removeField } from './edit-table.business';
import { TableVm } from './edit-table.vm';
import { GUID } from '@/core/model';
import * as editTableVm from './edit-table.vm';

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
  it('should not update if children IDs don`t match ', () => {
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
