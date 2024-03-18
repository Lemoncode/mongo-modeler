import React from 'react';
import { RelationVm } from '@/core/providers';

interface Props {
  data: RelationVm;
}

export const RelationAccessible: React.FC<Props> = props => {
  const { data } = props;
  //Todo: #387 Canvas Accessible-relation (https://github.com/Lemoncode/mongo-modeler/issues/387)
  return (
    <>
      <h3>
        Relation 1: Books-Authors-id with Authors-_id
        <button>Edit relation 1</button>
        <button>Delete relation 1</button>
      </h3>
    </>
  );
};
