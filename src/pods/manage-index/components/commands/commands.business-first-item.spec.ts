import { FieldVm } from '../../manage-index.vm';
import { isFirstItemInArray } from './commands.business';

describe('isFirstItemInArray', () => {
  it('should return true when it is the first item of the array', () => {
    // Arrange
    const indexes: FieldVm[] = [
      { id: '1', name: 'Index1', isUnique: false, sparse: false, fields: [] },
      { id: '2', name: 'Index2', isUnique: false, sparse: false, fields: [] },
    ];
    //Act
    const firstItem = isFirstItemInArray(indexes, '1');

    //Assert
    expect(firstItem).toBeTruthy();
  });

  it('should return false when it is not the last item of the array', () => {
    // Arrange
    const indexes: FieldVm[] = [
      { id: '1', name: 'Index1', isUnique: false, sparse: false, fields: [] },
      { id: '2', name: 'Index2', isUnique: false, sparse: false, fields: [] },
    ];
    //Act
    const firstItem = isFirstItemInArray(indexes, '2');

    //Assert
    expect(firstItem).toBeFalsy();
  });

  it('should return false when it is not the first item of the array', () => {
    // Arrange
    const indexes: FieldVm[] = [
      { id: '1', name: 'Index1', isUnique: false, sparse: false, fields: [] },
      { id: '2', name: 'Index2', isUnique: false, sparse: false, fields: [] },
    ];
    //Act
    const firstItem = isFirstItemInArray(indexes, '2');

    //Assert
    expect(firstItem).toBeFalsy();
  });
});
