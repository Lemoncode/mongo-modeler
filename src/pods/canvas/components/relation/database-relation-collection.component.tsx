import React from 'react';
import { Coords, GUID } from '@/core/model';
import { DatabaseSchemaVm, RelationVm } from '@/core/providers/canvas-schema';
import DatabaseRelationshipComponent from './database-relation.component';
import {
  calculateRelationXCoordinate,
  calculateRelationYCoordinate,
} from '@/core/providers/canvas-schema/canvas.business';
import { RelationAdorner } from './relation-adorner';

interface DatabaseRelationCollectionProps {
  schema: DatabaseSchemaVm;
  onEditRelation: (relationId: GUID) => void;
}

export const DatabaseRelationCollectionComponent: React.FC<
  DatabaseRelationCollectionProps
> = ({ schema, onEditRelation }) => {
  const renderRelation = (relation: RelationVm) => {
    const fromTable = schema.tables.find(
      table => table.id === relation.fromTableId
    );
    const toTable = schema.tables.find(
      table => table.id === relation.toTableId
    );

    if (!fromTable || !toTable) {
      return null;
    }

    const YCoords = calculateRelationYCoordinate(
      relation.fromFieldId,
      relation.toFieldId,
      fromTable,
      toTable
    );
    const XCoords = calculateRelationXCoordinate(fromTable, toTable);

    const startCoords: Coords = {
      x: XCoords.xOrigin,
      y: YCoords.yOrigin,
    };

    const endCoords: Coords = {
      x: XCoords.xDestination,
      y: YCoords.yDestination,
    };

    return (
      <React.Fragment
        key={`${relation.fromTableId}-${relation.fromFieldId}-${relation.toTableId}-${relation.toFieldId}`}
      >
        <DatabaseRelationshipComponent
          id={relation.id}
          onClick={onEditRelation}
          relationType={relation.type}
          startCoords={startCoords}
          endCoords={endCoords}
        />
        <RelationAdorner
          relationType={relation.type}
          startCoords={startCoords}
          endCoords={endCoords}
        />
      </React.Fragment>
    );
  };

  return <g>{schema.relations.map(relation => renderRelation(relation))}</g>;
};
