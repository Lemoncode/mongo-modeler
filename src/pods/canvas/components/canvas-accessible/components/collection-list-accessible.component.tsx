import React from 'react';
import { CollectionAccessible } from './collection-accessible.component';
import { DatabaseSchemaVm } from '@/core/providers';

interface Props {
  canvasSchema: DatabaseSchemaVm;
}

export const CollectionListAccessible: React.FC<Props> = props => {
  const { canvasSchema } = props;

  const collectionRefs = React.useRef<{
    [key: string]: React.RefObject<HTMLHeadingElement>;
  }>({});

  React.useEffect(() => {
    canvasSchema.tables.forEach(table => {
      collectionRefs.current[table.id] = React.createRef<HTMLHeadingElement>();
    });
  }, [canvasSchema.tables]);

  return (
    <>
      <h2>Collections</h2>

      {canvasSchema.tables.map(table => (
        <CollectionAccessible
          key={table.id}
          table={table}
          canvasSchema={canvasSchema}
          collectionRefs={collectionRefs}
        />
      ))}
    </>
  );
};
