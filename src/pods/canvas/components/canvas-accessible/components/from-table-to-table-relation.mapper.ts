import { RelationVm } from '@/core/providers';

// TODO: Add testing

export const fromTableToTableRelationMapper = (
  relation: RelationVm
): RelationVm => {
  return {
    id: relation.id,
    type: relation.type === '1:M' ? 'M:1' : '1:M',
    fromTableId: relation.toTableId,
    fromFieldId: relation.toFieldId,
    toTableId: relation.fromTableId,
    toFieldId: relation.fromFieldId,
  };
};
