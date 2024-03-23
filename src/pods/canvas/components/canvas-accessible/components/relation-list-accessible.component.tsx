import React from 'react';
import { RelationAccessible } from './relation-accessible.component';
import { DatabaseSchemaVm } from '@/core/providers';

interface Props {
  canvasSchema: DatabaseSchemaVm;
}

export const RelationListAccessible: React.FC<Props> = props => {
  const { canvasSchema } = props;
  return (
    <>
      <h2>Relations</h2>
      {canvasSchema.relations.map(relation => (
        <RelationAccessible relation={relation} />
      ))}

      <h3>
        Relation 2: Review-books with Books-_id
        <button>Edit relation 2</button>
        <button>Delete relation 2</button>
      </h3>
    </>
  );
};
