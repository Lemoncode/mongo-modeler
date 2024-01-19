import { pruneNonObjectChildren } from './edit-table.business';
import { FieldVm } from './edit-table.vm';

describe('addFieldLogic', () => {
  it('should add a field at the top level', () => {
    // Arrange
    const field: FieldVm = {
      id: '1',
      PK: false,
      FK: false,
      name: 'Field1',
      type: 'object',
      children: [
        { id: '11', PK: false, FK: false, name: 'Field1', type: 'string' },
        { id: '22', PK: false, FK: false, name: 'Field2', type: 'string' },
      ],
    };

    //Act
    const result = pruneNonObjectChildren('type', field, 'null');

    //Assert
    const expected = {
      id: '1',
      PK: false,
      FK: false,
      name: 'Field1',
      type: 'object',
    };

    expect(result).toEqual(expected);
  });
});
