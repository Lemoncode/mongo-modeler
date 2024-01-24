import React from 'react';
import { Coords, GUID } from '@/core/model';
import { RelationType, TABLE_CONST } from '@/core/providers';
import { ClickableLineComponent, ForkComponent } from './components';
import {
  calculateOriginMinusForkWidthLogic,
  isDrawLeftToRightLogic,
} from './relation.business';
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

  // Determine the direction of the fork
  const isDrawLeftToRight = isDrawLeftToRightLogic(
    relationType,
    startCoords,
    endCoords
  );

  const originXMinusFork = calculateOriginMinusForkWidthLogic(
    relationType,
    startCoords
  );

  const oneToOneRelationSelfPath = `
  M ${startCoords.x} ${startCoords.y} 
  H ${startCoords.x - TABLE_CONST.HORIZONTAL_LEFT_EXTENSION} 
  V ${endCoords.y} 
  H ${endCoords.x}
  `;

  const oneToManyRelationSelfPath = `
  M ${startCoords.x} ${startCoords.y} 
  H ${startCoords.x - TABLE_CONST.HORIZONTAL_LEFT_EXTENSION} 
  V ${endCoords.y}
  H ${originXMinusFork}
  `;

  const manyToOneRelationSelfPath = `
  M ${originXMinusFork} ${startCoords.y} 
  H ${startCoords.x - TABLE_CONST.HORIZONTAL_LEFT_EXTENSION} 
  V ${endCoords.y}
  H ${endCoords.x}
  `;

  const getRelationPathBasedOnType = (relationType: RelationType) => {
    switch (relationType) {
      case '1:M':
        return oneToManyRelationSelfPath;
      case 'M:1':
        return manyToOneRelationSelfPath;
      default:
        return oneToOneRelationSelfPath;
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
        d={getRelationPathBasedOnType(relationType)}
        className={
          isSelected ? classes.selectedRelation : classes.nonSelectedRelation
        }
        filter={isSelected ? `url(#table_glow)` : ''}
      />

      {/* Draw the fork */}
      {relationType === '1:M' && (
        <ForkComponent
          isSelected={isSelected}
          forkCoords={{ x: endCoords.x - 10, y: endCoords.y }}
          drawLeftToRight={!isDrawLeftToRight}
        />
      )}
      {relationType === 'M:1' && (
        <ForkComponent
          isSelected={isSelected}
          forkCoords={{ x: originXMinusFork, y: startCoords.y }}
          drawLeftToRight={!isDrawLeftToRight}
        />
      )}

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
