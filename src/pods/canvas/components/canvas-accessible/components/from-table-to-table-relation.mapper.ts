import { RelationVm } from '@/core/providers';

interface Props {
  relation: RelationVm;
}

export const fromTableToTableRelationMapper = (props: Props): RelationVm => {
  const { relation } = props;
  return {
    id: relation.id,
    type: relation.type === '1:M' ? 'M:1' : '1:M',
    fromTableId: relation.toTableId,
    fromFieldId: relation.toFieldId,
    toTableId: relation.fromTableId,
    toFieldId: relation.fromFieldId,
  };
};
