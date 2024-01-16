import { moveUpField } from './edit-table.business';
import { TableVm } from './edit-table.vm';

describe('moveDownField', () => {
  it('should move a field to up level', () => {
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
    const updateTable = moveUpField(table, '2');

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

  it('should move a field to up level even if it is nested', () => {
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
            { id: '11', PK: false, FK: false, name: 'Field11', type: 'string' },
            { id: '22', PK: false, FK: false, name: 'Field22', type: 'string' },
          ],
        },
        { id: '3', PK: false, FK: false, name: 'Field3', type: 'string' },
      ],
      tableName: 'MyTable',
      x: 0,
      y: 0,
    };

    // Act
    const updateTable = moveUpField(table, '22');

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
            { id: '22', PK: false, FK: false, name: 'Field22', type: 'string' },
            { id: '11', PK: false, FK: false, name: 'Field11', type: 'string' },
          ],
        },
        { id: '3', PK: false, FK: false, name: 'Field3', type: 'string' },
      ],
      tableName: 'MyTable',
      x: 0,
      y: 0,
    };
    expect(updateTable).toEqual(expected);
  });

  it('should not move a field if is the first field', () => {
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
    const updateTable = moveUpField(table, '1');

    //Assert
    const expected: TableVm = {
      id: '1',
      fields: [
        { id: '1', PK: false, FK: false, name: 'Field1', type: 'string' },
        { id: '2', PK: false, FK: false, name: 'Field2', type: 'string' },
      ],
      tableName: 'MyTable',
      x: 0,
      y: 0,
    };
    expect(updateTable).toEqual(expected);
  });

  it('should not move a field if it is the first field even if it is nested', () => {
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
            { id: '11', PK: false, FK: false, name: 'Field11', type: 'string' },
            { id: '22', PK: false, FK: false, name: 'Field22', type: 'string' },
          ],
        },
        { id: '3', PK: false, FK: false, name: 'Field3', type: 'string' },
      ],
      tableName: 'MyTable',
      x: 0,
      y: 0,
    };

    // Act
    const updateTable = moveUpField(table, '11');

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
            { id: '11', PK: false, FK: false, name: 'Field11', type: 'string' },
            { id: '22', PK: false, FK: false, name: 'Field22', type: 'string' },
          ],
        },
        { id: '3', PK: false, FK: false, name: 'Field3', type: 'string' },
      ],
      tableName: 'MyTable',
      x: 0,
      y: 0,
    };
    expect(updateTable).toEqual(expected);
  });
});
