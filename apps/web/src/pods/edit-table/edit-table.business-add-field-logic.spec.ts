import { GenerateGUID } from '@/core/model';
import { addFieldLogic } from './edit-table.business';
import { TableVm } from './edit-table.vm';

describe('addFieldLogic', () => {
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

    const updateTable = addFieldLogic(table, '1', false, GenerateGUID());

    expect(updateTable.fields).toHaveLength(3);
    expect(updateTable.fields[1].name).toBe('newField');
  });

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
    const updateTable = addFieldLogic(table, '1', true, GenerateGUID());

    expect(updateTable.fields[0].children).toHaveLength(2);
    expect(updateTable.fields[0].children?.[0]?.name).toBe('newField');
  });

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
    const updateTable = addFieldLogic(
      table,
      'nonexistentFieldId',
      false,
      GenerateGUID()
    );
    expect(updateTable).toEqual(table);
  });

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
    const updateTable = addFieldLogic(
      table,
      'nonexistentFieldId',
      true,
      GenerateGUID()
    );
    expect(updateTable).toEqual(table);
  });
});
