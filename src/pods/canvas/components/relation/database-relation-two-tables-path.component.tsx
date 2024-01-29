import React from 'react';
import { RelationType } from '@/core/providers/canvas-schema';
import { Coords, GUID } from '@/core/model';
import { getRelationPath } from './database-relation-two-tables-path.business';
import { ClickablePathComponent } from './components/clickeable-path.component';
import classes from './database-relation.component.module.css';
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
  startCoords,
  relationType,
  endCoords,
  isSelected,
  onClick,
  onDoubleClick,
}) => {
  return (
    <svg>
      {/* Glow filter if selected */}
      <defs>
        <filter id="table_glow">
          <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path
        d={getRelationPath(relationType, startCoords, endCoords)}
        className={
          isSelected ? classes.selectedRelation : classes.nonSelectedRelation
        }
        filter={isSelected ? `url(#table_glow)` : ''}
      />

      <ClickablePathComponent
        id={id}
        startCoords={startCoords}
        endCoords={endCoords}
        relationType={relationType}
        onClick={onClick}
        onDoubleClick={onDoubleClick}
        className={
          isSelected ? classes.selectedRelation : classes.nonSelectedRelation
        }
      />
    </svg>
  );
};
