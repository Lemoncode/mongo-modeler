import React from 'react';
import { RelationType, TABLE_CONST } from '@/core/providers/canvas-schema';
import { Coords, GUID } from '@/core/model';
import classes from './database-relation.component.module.css';
import { ClickableLineComponent } from './components';
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
  const oneToOneRelationSelfPathLeft = `
  M ${startCoords.x - TABLE_CONST.TABLE_WIDTH} ${startCoords.y} 
  H ${startCoords.x - (TABLE_CONST.TABLE_WIDTH + TABLE_CONST.HORIZONTAL_LEFT_EXTENSION)} 
  V ${endCoords.y} 
  H ${endCoords.x}
  `;

  const oneToOneRelationSelfPathRight = `
  M ${startCoords.x + TABLE_CONST.TABLE_WIDTH} ${startCoords.y}
  H ${startCoords.x + TABLE_CONST.TABLE_WIDTH + TABLE_CONST.HORIZONTAL_LEFT_EXTENSION}
  V ${endCoords.y}
  H ${endCoords.x}
  `;

  const getRelationPath = () => {
    if (relationType === '1:1') {
      return startCoords.x < endCoords.x
        ? oneToOneRelationSelfPathRight
        : oneToOneRelationSelfPathLeft;
    }
  };

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
        d={getRelationPath()}
        className={
          isSelected ? classes.selectedRelation : classes.nonSelectedRelation
        }
        filter={isSelected ? `url(#table_glow)` : ''}
      />

      <ClickableLineComponent
        id={id}
        startCoords={startCoords}
        endCoords={endCoords}
        onClick={onClick}
        onDoubleClick={onDoubleClick}
      />
    </svg>
  );
};
