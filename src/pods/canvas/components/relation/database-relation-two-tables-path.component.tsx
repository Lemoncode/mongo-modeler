import React from 'react';
import { RelationType } from '@/core/providers/canvas-schema';
import { Coords, GUID } from '@/core/model';
import { DatabaseRelationshipTwoTablesStraightComponent } from './database-relation-two-tables-straight.component';

interface DatabaseRelationshipMiddleProps {
  id: GUID;
  relationType: RelationType;
  startCoords: Coords;
  endCoords: Coords;
  onClick: (relationId: GUID) => void;
  onDoubleClick: (relationId: GUID) => void;
  isSelected: boolean;
}

export const DatabaseRelationshipTwoTablePathComponent: React.FC<
  DatabaseRelationshipMiddleProps
> = ({
  id,
  relationType,
  startCoords,
  endCoords,
  isSelected,
  onClick,
  onDoubleClick,
}) => {
  console.log('DRAW PATH CONNECTOR');

  return (
    <DatabaseRelationshipTwoTablesStraightComponent
      id={id}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      relationType={relationType}
      startCoords={startCoords}
      endCoords={endCoords}
      isSelected={isSelected}
    />
  );
};
