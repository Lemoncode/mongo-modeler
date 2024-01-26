import React from 'react';
import { Coords, GUID } from '@/core/model';
import { DatabaseSchemaVm, RelationVm } from '@/core/providers/canvas-schema';
import {
  calculateRelationXCoordinate,
  calculateRelationYCoordinate,
} from '@/core/providers/canvas-schema/canvas.business';
import { DatabaseRelationSelfComponent } from './database-relation-self.component';
import { DatabaseRelationshipMiddleComponent } from './database-relation-middle.component';
import { DatabaseRelationshipTwoTablesComponent } from './database-relation-two-tables.component';

interface DatabaseRelationCollectionProps {
  schema: DatabaseSchemaVm;
  onSelectRelation: (relationId: GUID) => void;
  onEditRelation: (relationId: GUID) => void;
}

export const DatabaseRelationCollectionComponent: React.FC<
  DatabaseRelationCollectionProps
> = ({ schema, onEditRelation, onSelectRelation }) => {
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

    console.log('startCoords', startCoords);
    console.log('endCoords', endCoords);
    return (
      <React.Fragment
        key={`${relation.fromTableId}-${relation.fromFieldId}-${relation.toTableId}-${relation.toFieldId}`}
      >
        {relation.fromTableId === relation.toTableId ? (
          <DatabaseRelationSelfComponent
            id={relation.id}
            onClick={onSelectRelation}
            onDoubleClick={onEditRelation}
            relationType={relation.type}
            startCoords={startCoords}
            endCoords={endCoords}
            isSelected={relation.id === schema.selectedElementId}
          />
        ) : startCoords.x > endCoords.x ? (
          <DatabaseRelationshipMiddleComponent
            id={relation.id}
            onClick={onSelectRelation}
            onDoubleClick={onEditRelation}
            relationType={relation.type}
            startCoords={startCoords}
            endCoords={endCoords}
            isSelected={relation.id === schema.selectedElementId}
          />
        ) : (
          <DatabaseRelationshipTwoTablesComponent
            id={relation.id}
            onClick={onSelectRelation}
            onDoubleClick={onEditRelation}
            relationType={relation.type}
            startCoords={startCoords}
            endCoords={endCoords}
            isSelected={relation.id === schema.selectedElementId}
          />
        )}
      </React.Fragment>
    );
  };

  return <g>{schema.relations.map(relation => renderRelation(relation))}</g>;
};
