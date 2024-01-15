import { moveDownField } from './edit-table.business';
import { TableVm } from './edit-table.vm';

describe('moveDownField', () => {
  it('should move a field to down level', () => {
    // Arrange
    const table: TableVm = {
      id: '1',
      fields: [
        { id: '1', PK: false, FK: false, name: 'Field1', type: 'string' },
        { id: '2', PK: false, FK: false, name: 'Field2', type: 'string' },
      ],
      tableName: 'MyTable',
      x: 0,
      y: 0,
    };

    //Act
    const updateTable = moveDownField(table, '1');

    //Assert
    const expected: TableVm = {
      id: '1',
      fields: [
        { id: '2', PK: false, FK: false, name: 'Field2', type: 'string' },
        { id: '1', PK: false, FK: false, name: 'Field1', type: 'string' },
      ],
      tableName: 'MyTable',
      x: 0,
      y: 0,
    };
    expect(updateTable).toEqual(expected);
  });

  it('should move a field to down level even if it is nested', () => {
    // Arrange
    const table: TableVm = {
      id: '1',
      fields: [
        { id: '1', PK: false, FK: false, name: 'Field1', type: 'string' },
        { id: '2', PK: false, FK: false, name: 'Field2', type: 'string' },
      ],
      tableName: 'MyTable',
      x: 0,
      y: 0,
    };

    // Act
    const updateTable = moveDownField(table, '1');

    // Assert
    const expected: TableVm = {
      id: '1',
      fields: [
        { id: '2', PK: false, FK: false, name: 'Field2', type: 'string' },
        { id: '1', PK: false, FK: false, name: 'Field1', type: 'string' },
      ],
      tableName: 'MyTable',
      x: 0,
      y: 0,
    };
    expect(updateTable).toEqual(expected);
  });
  it('should not move a field if is the last field', () => {
    // Arrange
    const table: TableVm = {
      id: '1',
      fields: [
        { id: '1', PK: false, FK: false, name: 'Field1', type: 'string' },
        {
          id: '2',
          PK: false,
          FK: false,
          name: 'Field2',
          type: 'object',
          children: [
            { id: '11', PK: false, FK: false, name: 'Field1', type: 'string' },
            { id: '22', PK: false, FK: false, name: 'Field2', type: 'string' },
          ],
        },
        { id: '3', PK: false, FK: false, name: 'Field2', type: 'string' },
      ],
      tableName: 'MyTable',
      x: 0,
      y: 0,
    };

    // Act
    const updateTable = moveDownField(table, '11');

    // Assert
    const expected: TableVm = {
      id: '1',
      fields: [
        { id: '1', PK: false, FK: false, name: 'Field1', type: 'string' },
        {
          id: '2',
          PK: false,
          FK: false,
          name: 'Field2',
          type: 'object',
          children: [
            { id: '22', PK: false, FK: false, name: 'Field2', type: 'string' },
            { id: '11', PK: false, FK: false, name: 'Field1', type: 'string' },
          ],
        },
        { id: '3', PK: false, FK: false, name: 'Field2', type: 'string' },
      ],
      tableName: 'MyTable',
      x: 0,
      y: 0,
    };
    expect(updateTable).toEqual(expected);
  });

  it('must not move a field if it is the last field even if it is nested', () => {
    // Arrange
    const table: TableVm = {
      id: '1',
      fields: [
        { id: '1', PK: false, FK: false, name: 'Field1', type: 'string' },
        {
          id: '2',
          PK: false,
          FK: false,
          name: 'Field2',
          type: 'object',
          children: [
            { id: '11', PK: false, FK: false, name: 'Field1', type: 'string' },
            { id: '22', PK: false, FK: false, name: 'Field2', type: 'string' },
          ],
        },
        { id: '3', PK: false, FK: false, name: 'Field2', type: 'string' },
      ],
      tableName: 'MyTable',
      x: 0,
      y: 0,
    };

    // Act
    const updateTable = moveDownField(table, '22');

    // Assert
    const expected: TableVm = {
      id: '1',
      fields: [
        { id: '1', PK: false, FK: false, name: 'Field1', type: 'string' },
        {
          id: '2',
          PK: false,
          FK: false,
          name: 'Field2',
          type: 'object',
          children: [
            { id: '11', PK: false, FK: false, name: 'Field1', type: 'string' },
            { id: '22', PK: false, FK: false, name: 'Field2', type: 'string' },
          ],
        },
        { id: '3', PK: false, FK: false, name: 'Field2', type: 'string' },
      ],
      tableName: 'MyTable',
      x: 0,
      y: 0,
    };
    expect(updateTable).toEqual(expected);
  });
});
