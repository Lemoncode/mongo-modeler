import React from 'react';
import { Coords } from '@/core/model';
import { DatabaseSchemaVm, RelationVm } from '@/core/providers/canvas-schema';
import {
  calculateRelationXCoordinate,
  calculateRelationYCoordinate,
} from '@/core/providers/canvas-schema/canvas.business';
import { isOverLapping } from '@/pods/canvas/components/relation/database-relation-collection.business';
import { LayoutType } from '@/pods/canvas/components/relation/relation.vm';
import {
  DatabaseRelationSelfExportComponent,
  DatabaseRelationshipTwoTablesStraightExportComponent,
  DatabaseRelationshipTwoTablePathExportComponent,
} from './components';

interface DatabaseRelationCollectionProps {
  schema: DatabaseSchemaVm;
}

export const DatabaseRelationCollectionComponent: React.FC<
  DatabaseRelationCollectionProps
> = ({ schema }) => {
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

    const getLayoutType = (): LayoutType => {
      if (relation.fromTableId === relation.toTableId) return 'self';
      if (isOverLapping(fromTable.x, toTable.x)) return 'overlapping';
      return 'straight';
    };

    const renderRelation = () => {
      const layoutType = getLayoutType();

      switch (layoutType) {
        case 'self':
          return (
            <DatabaseRelationSelfExportComponent
              relationType={relation.type}
              startCoords={startCoords}
              endCoords={endCoords}
            />
          );
        case 'overlapping':
          return (
            <DatabaseRelationshipTwoTablePathExportComponent
              relationType={relation.type}
              startCoords={startCoords}
              endCoords={endCoords}
            />
          );
        case 'straight':
          return (
            <DatabaseRelationshipTwoTablesStraightExportComponent
              relationType={relation.type}
              startCoords={startCoords}
              endCoords={endCoords}
            />
          );
      }
    };

    return (
      <React.Fragment
        key={`${relation.fromTableId}-${relation.fromFieldId}-${relation.toTableId}-${relation.toFieldId}`}
      >
        {renderRelation()}
      </React.Fragment>
    );
  };

  return <g>{schema.relations.map(relation => renderRelation(relation))}</g>;
};
