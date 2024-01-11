import { addFieldLogic } from './edit-table.business';
import { TableVm } from './edit-table.vm';

describe('add a field at the top level', () => {
  it('should add a field at the top level', () => {
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

    const updateTable = addFieldLogic(table, '1', false);

    expect(updateTable.fields).toHaveLength(3);
    expect(updateTable.fields[1].name).toBe('newField');
  });
});

describe('add a nested field', () => {
  it('should add a nested field', () => {
    const table: TableVm = {
      id: '1',
      fields: [
        {
          id: '1',
          PK: false,
          FK: false,
          name: 'Field1',
          type: 'string',
          children: [
            { id: '3', PK: false, FK: false, name: 'Field3', type: 'string' },
          ],
        },
        { id: '2', PK: false, FK: false, name: 'Field2', type: 'string' },
      ],
      tableName: 'MyTable',
      x: 0,
      y: 0,
    };
    const updateTable = addFieldLogic(table, '1', true);

    expect(updateTable.fields[0].children).toHaveLength(2);
    expect(updateTable.fields[0].children?.[0]?.name).toBe('newField');
  });
});

describe('does not add a field if the target field does not exist', () => {
  it('should not add a field if the target field does not exist', () => {
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
    const updateTable = addFieldLogic(table, 'nonexistentFieldId', false);
    expect(updateTable).toEqual(table);
  });
});

describe('does not add a nested field if the target field does not exist', () => {
  it('should not add a nested field if the target field does not exist', () => {
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
    const updateTable = addFieldLogic(table, 'nonexistentFieldId', true);
    expect(updateTable).toEqual(table);
  });
});
