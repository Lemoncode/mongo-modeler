import React from 'react';
import { Coords, GUID } from '@/core/model';
import {
  DatabaseSchemaVm,
  RelationVm,
  TABLE_CONST,
} from '@/core/providers/canvas-schema';
import {
  calculateRelationXCoordinate,
  calculateRelationYCoordinate,
} from '@/core/providers/canvas-schema/canvas.business';
import { DatabaseRelationSelfComponent } from './database-relation-self.component';
import { DatabaseRelationshipTwoTablePathComponent } from './database-relation-two-tables-path.component';
import { DatabaseRelationshipTwoTablesStraightComponent } from './database-relation-two-tables-straight.component';
import { isOverLapping } from './database-relation-collection.business';
import { LayoutType } from './relation.vm';

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

    const getLayoutType = (): LayoutType => {
      if (relation.fromTableId === relation.toTableId) return 'self';
      if (isOverLapping(fromTable, toTable)) return 'overlapping';
      return 'straight';
    };

    const renderRelation = () => {
      const layoutType = getLayoutType();

      switch (layoutType) {
        case 'self':
          return (
            <DatabaseRelationSelfComponent
              id={relation.id}
              onClick={onSelectRelation}
              onDoubleClick={onEditRelation}
              relationType={relation.type}
              startCoords={startCoords}
              endCoords={endCoords}
              isSelected={relation.id === schema.selectedElementId}
              tableWidth={fromTable.width ?? TABLE_CONST.DEFAULT_TABLE_WIDTH}
            />
          );
        case 'overlapping':
          return (
            <DatabaseRelationshipTwoTablePathComponent
              id={relation.id}
              onClick={onSelectRelation}
              onDoubleClick={onEditRelation}
              relationType={relation.type}
              startCoords={startCoords}
              endCoords={endCoords}
              isSelected={relation.id === schema.selectedElementId}
            />
          );
        case 'straight':
          return (
            <DatabaseRelationshipTwoTablesStraightComponent
              id={relation.id}
              onClick={onSelectRelation}
              onDoubleClick={onEditRelation}
              relationType={relation.type}
              startCoords={startCoords}
              endCoords={endCoords}
              isSelected={relation.id === schema.selectedElementId}
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
