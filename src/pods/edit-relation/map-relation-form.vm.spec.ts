import { vi } from 'vitest';

import * as generate from '@/core/model';

import { mapRelationFormVmToRelationVM } from './edit-relation.business';
import { RelationFormVm } from './edit-relation.vm';

describe('mapRelationFormVmToRelationVM', () => {
  it('Should return RelationVm and generate a new ID when passing FormRelationVm without an ID', () => {
    // Arrange
    const relationForm: RelationFormVm = {
      fromFieldId: { id: '1', label: 'id' },
      fromTableId: { id: '2', label: 'Restaurant' },
      toFieldId: { id: '3', label: 'id' },
      toTableId: { id: '4', label: 'Tag' },
      type: { id: '1', label: '1:1' },
    };

    vi.spyOn(generate, 'GenerateGUID').mockReturnValue('55');

    // Act
    const result = mapRelationFormVmToRelationVM(relationForm);

    // Assert
    expect(result).toEqual({
      id: '55',
      fromFieldId: '1',
      fromTableId: '2',
      toFieldId: '3',
      toTableId: '4',
      type: '1:1',
    });
  });
  it('Should return RelationVm and ID when passing FormRelationVm an ID', () => {
    // Arrange
    const relationForm: RelationFormVm = {
      fromFieldId: { id: '1', label: 'id' },
      fromTableId: { id: '2', label: 'Restaurant' },
      toFieldId: { id: '3', label: 'id' },
      toTableId: { id: '4', label: 'Tag' },
      type: { id: '1', label: '1:1' },
    };

    const id = '33';

    // Act
    const result = mapRelationFormVmToRelationVM(relationForm, id);

    // Assert
    expect(result).toEqual({
      id: '33',
      fromFieldId: '1',
      fromTableId: '2',
      toFieldId: '3',
      toTableId: '4',
      type: '1:1',
    });
  });
  it('Should return type "1:M" and ID when passing FormRelationVm type with label: "1:M"', () => {
    // Arrange
    const relationForm: RelationFormVm = {
      fromFieldId: { id: '1', label: 'id' },
      fromTableId: { id: '2', label: 'Restaurant' },
      toFieldId: { id: '3', label: 'id' },
      toTableId: { id: '4', label: 'Tag' },
      type: { id: '1', label: '1:M' },
    };

    const id = '33';

    // Act
    const result = mapRelationFormVmToRelationVM(relationForm, id);

    // Assert
    expect(result).toEqual({
      id: '33',
      fromFieldId: '1',
      fromTableId: '2',
      toFieldId: '3',
      toTableId: '4',
      type: '1:M',
    });
  });
  it('Should return type "M:1" and ID when passing FormRelationVm type with label: "M:1"', () => {
    // Arrange
    const relationForm: RelationFormVm = {
      fromFieldId: { id: '1', label: 'id' },
      fromTableId: { id: '2', label: 'Restaurant' },
      toFieldId: { id: '3', label: 'id' },
      toTableId: { id: '4', label: 'Tag' },
      type: { id: '1', label: 'M:1' },
    };

    const id = '33';

    // Act
    const result = mapRelationFormVmToRelationVM(relationForm, id);

    // Assert
    expect(result).toEqual({
      id: '33',
      fromFieldId: '1',
      fromTableId: '2',
      toFieldId: '3',
      toTableId: '4',
      type: 'M:1',
    });
  });
});
