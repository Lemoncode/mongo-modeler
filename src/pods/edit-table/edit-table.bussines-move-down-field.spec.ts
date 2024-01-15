import { moveDownField } from './edit-table.business';
import { TableVm } from './edit-table.vm';

describe('moveDownField', () => {
  it('should move a field to down level', () => {
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

    const updateTable = moveDownField(table, '1');
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
});
