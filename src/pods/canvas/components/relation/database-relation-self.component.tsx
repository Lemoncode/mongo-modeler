import React from 'react';
import { Coords, GUID } from '@/core/model';
import { RelationType, TABLE_CONST } from '@/core/providers';
import { ClickableLineComponent } from './components';
import { calculateOriginMinusForkWidthLogic } from './relation.business';
import classes from './database-relation.component.module.css';

interface DatabaseSelfRelationshipProps {
  id: GUID;
  relationType: RelationType;
  startCoords: Coords;
  endCoords: Coords;
  onClick: (relationId: GUID) => void;
  onDoubleClick: (relationId: GUID) => void;
  isSelected: boolean;
}

export const DatabaseRelationSelfComponent: React.FC<
  DatabaseSelfRelationshipProps
> = props => {
  const {
    id,
    relationType,
    startCoords,
    endCoords,
    isSelected,
    onClick,
    onDoubleClick,
  } = props;

  const originXMinusFork = calculateOriginMinusForkWidthLogic(
    relationType,
    startCoords
  );

  const oneToOneRelationSelfPath = `
  M ${originXMinusFork} ${startCoords.y} 
  H ${originXMinusFork - TABLE_CONST.HORIZONTAL_LEFT_EXTENSION} 
  V ${endCoords.y} 
  H ${originXMinusFork}
  `;

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
        d={oneToOneRelationSelfPath}
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
