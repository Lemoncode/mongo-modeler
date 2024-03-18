import React from 'react';
import { RelationAccessible } from './relation-accessible.component';
import { RelationVm } from '@/core/providers';

interface Props {
  relationList: RelationVm[];
}

export const RelationListAccessible: React.FC<Props> = props => {
  const { relationList } = props;
  // Todo: #386Canvas Accessible-Iterate over relations(https://github.com/Lemoncode/mongo-modeler/issues/386)
  return (
    <>
      <h2>Relations</h2>
      {relationList.map(relation => (
        <RelationAccessible data={relation} />
      ))}

      <h3>
        Relation 2: Review-books with Books-_id
        <button>Edit relation 2</button>
        <button>Delete relation 2</button>
      </h3>
    </>
  );
};
