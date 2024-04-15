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
      {canvasSchema.relations.map((relation, index) => (
        <RelationAccessible
          relation={relation}
          key={relation.id}
          index={index + 1}
          canvas={canvasSchema}
        />
      ))}
    </>
  );
};
