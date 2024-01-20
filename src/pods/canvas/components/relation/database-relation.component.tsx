import React from 'react';
import { RelationType } from '@/core/providers/canvas-schema';
import { Coords, GUID } from '@/core/model';
import { ForkComponent } from './components';
import {
  calculateDestinationXMinusForkLogic,
  calculateOriginMinusForkWidthLogic,
  isDrawLeftToRightLogic,
} from './relation.business';
import classes from './database-relation.component.module.css';

interface DatabaseRelationshipProps {
  id: GUID;
  relationType: RelationType;
  startCoords: Coords;
  endCoords: Coords;
  onClick: (relationId: GUID) => void;
  onDoubleClick: (relationId: GUID) => void;
  isSelected: boolean;
}

const DatabaseRelationshipComponent: React.FC<DatabaseRelationshipProps> = ({
  id,
  relationType,
  startCoords,
  endCoords,
  isSelected,
  onClick,
  onDoubleClick,
}) => {
  const handleClick = (e: React.MouseEvent<SVGLineElement, MouseEvent>) => {
    onClick(id);
    e.stopPropagation();
  };

  // Enhancemnt proposal: #127
  // https://github.com/Lemoncode/mongo-modeler/pull/127
  const drawClickableLine = () => {
    return (
      <line
        x1={startCoords.x}
        y1={startCoords.y}
        x2={endCoords.x}
        y2={endCoords.y}
        strokeWidth={25}
        stroke="transparent"
        onClick={handleClick}
        onDoubleClick={() => onDoubleClick(id)}
      />
    );
  };

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

  const destinationXMinusFork = calculateDestinationXMinusForkLogic(
    relationType,
    endCoords,
    isDrawLeftToRight
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

      {/* Base line of the relationship */}
      <line
        x1={originXMinusFork}
        y1={startCoords.y}
        x2={destinationXMinusFork}
        y2={endCoords.y}
        className={
          isSelected ? classes.selectedRelation : classes.nonSelectedRelation
        }
        filter={isSelected ? `url(#table_glow)` : ''}
      />

      {/* Draw the fork */}
      {relationType === '1:M' && (
        <ForkComponent
          isSelected={isSelected}
          forkCoords={{ x: destinationXMinusFork, y: endCoords.y }}
          drawLeftToRight={isDrawLeftToRight}
        />
      )}
      {relationType === 'M:1' && (
        <ForkComponent
          isSelected={isSelected}
          forkCoords={{ x: originXMinusFork, y: startCoords.y }}
          drawLeftToRight={!isDrawLeftToRight}
        />
      )}

      {drawClickableLine()}
    </svg>
  );
};

export default DatabaseRelationshipComponent;
