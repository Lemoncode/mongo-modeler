import React from 'react';
import { RelationType } from '@/core/providers/canvas-schema';
import { Coords, GUID } from '@/core/model';
import { ForkComponent } from './components';
import {
  calculateDestinationXMinusForkLogic,
  calculateOriginMinusForkWidthLogic,
  isDrawLeftToRightLogic,
} from './relation.business';

interface DatabaseRelationshipProps {
  id: GUID;
  relationType: RelationType;
  startCoords: Coords;
  endCoords: Coords;
  onClick: (relationId: GUID) => void;
}

const DatabaseRelationshipComponent: React.FC<DatabaseRelationshipProps> = ({
  id,
  relationType,
  startCoords,
  endCoords,
  onClick,
}) => {
  // Enhancemnt proposal: #127
  // https://github.com/Lemoncode/mongo-modeler/pull/127
  const drawClickableLine = () => {
    return (
      <line
        x1={startCoords.x}
        y1={startCoords.y}
        x2={endCoords.x}
        y2={endCoords.y}
        strokeWidth={20}
        stroke="transparent"
        onClick={() => onClick(id)}
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
      {/* Base line of the relationship */}
      <line
        x1={originXMinusFork}
        y1={startCoords.y}
        x2={destinationXMinusFork}
        y2={endCoords.y}
        strokeWidth={2}
        stroke="#ffae42"
      />

      {/* Draw the fork */}
      {relationType === '1:M' && (
        <ForkComponent
          forkCoords={{ x: destinationXMinusFork, y: endCoords.y }}
          drawLeftToRight={isDrawLeftToRight}
        />
      )}
      {relationType === 'M:1' && (
        <ForkComponent
          forkCoords={{ x: originXMinusFork, y: startCoords.y }}
          drawLeftToRight={!isDrawLeftToRight}
        />
      )}

      {drawClickableLine()}
    </svg>
  );
};

export default DatabaseRelationshipComponent;
