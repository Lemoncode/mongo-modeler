import React from 'react';
import { RelationType } from '@/core/providers/canvas-schema';
import { Coords, GUID } from '@/core/model';
import {
  getForkCoords,
  getRelationPath,
} from './database-relation-two-tables-path.business';
import { ClickablePathComponent } from './components/clickable-path.component';
import { isDrawLeftToRightLogic } from './relation.business';
import { ForkComponent } from './components';
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
  const isDrawLeftToRight = isDrawLeftToRightLogic(
    relationType,
    startCoords,
    endCoords
  );

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

      {/* Draw the fork */}
      {relationType === '1:M' && (
        <ForkComponent
          isSelected={isSelected}
          forkCoords={getForkCoords(relationType, startCoords, endCoords)}
          drawLeftToRight={!isDrawLeftToRight}
        />
      )}
      {relationType === 'M:1' && (
        <ForkComponent
          isSelected={isSelected}
          forkCoords={getForkCoords(relationType, startCoords, endCoords)}
          drawLeftToRight={isDrawLeftToRight}
        />
      )}

      <ClickablePathComponent
        id={id}
        startCoords={startCoords}
        endCoords={endCoords}
        relationType={relationType}
        onClick={onClick}
        onDoubleClick={onDoubleClick}
      />
    </svg>
  );
};
