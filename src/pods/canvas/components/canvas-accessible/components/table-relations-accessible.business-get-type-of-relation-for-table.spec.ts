import { RelationVm } from '@/core/providers';
import { getTypeOfRelationForTable } from './table-relations-accessible.business';

describe('getTypeOfRelationForTable', () => {
  it('should return origin when tableId matches fromTableId', () => {
    // Arrange
    const tableId = '1';
    const relation: RelationVm = {
      fromTableId: '1',
      toTableId: '2',
      id: '',
      fromFieldId: '',
      toFieldId: '',
      type: '1:1',
    };

    // Act
    const result = getTypeOfRelationForTable(tableId, relation);

    // Assert
    expect(result).toEqual('origin');
  });

  it('should return destination when tableId matches toTableId', () => {
    // Arrange
    const tableId = '2';
    const relation: RelationVm = {
      fromTableId: '1',
      toTableId: '2',
      id: '',
      fromFieldId: '',
      toFieldId: '',
      type: '1:1',
    };

    // Act
    const result = getTypeOfRelationForTable(tableId, relation);

    // Assert
    expect(result).toEqual('destination');
  });

  it('should return none when tableId does not match either fromTableId or toTableId', () => {
    // Arrange
    const tableId = '3';
    const relation: RelationVm = {
      fromTableId: '1',
      toTableId: '2',
      id: '',
      fromFieldId: '',
      toFieldId: '',
      type: '1:1',
    };

    // Act
    const result = getTypeOfRelationForTable(tableId, relation);

    // Assert
    expect(result).toEqual('none');
  });
});
