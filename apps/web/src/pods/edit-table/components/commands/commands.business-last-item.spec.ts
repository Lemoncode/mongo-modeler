import { FieldVm } from '../../edit-table.vm';
import { isLastItemInArray } from './commands.business';

describe('isLastItemInArray', () => {
  it('should return true when it is the last item of fields array', () => {
    // Arrange
    const fields: FieldVm[] = [
      { id: '1', PK: false, FK: false, name: 'Field1', type: 'string' },
      { id: '2', PK: false, FK: false, name: 'Field2', type: 'string' },
    ];
    //Act
    const firstItem = isLastItemInArray(fields, '2');

    //Assert
    expect(firstItem).toBeTruthy();
  });
  it('should return false when it is not the last item of fields array', () => {
    // Arrange
    const fields: FieldVm[] = [
      { id: '1', PK: false, FK: false, name: 'Field1', type: 'string' },
      { id: '2', PK: false, FK: false, name: 'Field2', type: 'string' },
      { id: '3', PK: false, FK: false, name: 'Field3', type: 'string' },
      {
        id: '4',
        PK: false,
        FK: false,
        name: 'Field4',
        type: 'string',
        children: [
          { id: '41', PK: false, FK: false, name: 'Field41', type: 'string' },
          { id: '42', PK: false, FK: false, name: 'Field42', type: 'string' },
        ],
      },
    ];
    //Act
    const firstItem = isLastItemInArray(fields, '3');

    //Assert
    expect(firstItem).toBeFalsy();
  });

  it('should return false when it is not the last item of fields array', () => {
    // Arrange
    const fields: FieldVm[] = [
      { id: '1', PK: false, FK: false, name: 'Field1', type: 'string' },
      { id: '2', PK: false, FK: false, name: 'Field2', type: 'string' },
    ];
    //Act
    const firstItem = isLastItemInArray(fields, '1');

    //Assert
    expect(firstItem).toBeFalsy();
  });
});
