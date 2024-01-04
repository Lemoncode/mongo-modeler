import React from 'react';
import { RelationType } from '../../canvas.vm';
import { Coords } from '@/core/model';

interface DatabaseRelationshipProps {
  relationType: RelationType;
  startCoords: Coords;
  endCoords: Coords;
}

const FORK_WIDTH = 10;

const DatabaseRelationshipComponent: React.FC<DatabaseRelationshipProps> = ({
  relationType,
  startCoords,
  endCoords,
}) => {
  const drawFork = (forkCoords: Coords, drawLeftToRight: boolean) => {
    const lineSpacing = 5; // Spacing between the lines of the fork
    const direction = drawLeftToRight ? 1 : -1;

    return (
      <g>
        {/* Fork lines */}
        <line
          x1={forkCoords.x}
          y1={forkCoords.y}
          x2={forkCoords.x + FORK_WIDTH * direction}
          y2={forkCoords.y}
          stroke="white"
        />
        <line
          x1={forkCoords.x}
          y1={forkCoords.y}
          x2={forkCoords.x + FORK_WIDTH * direction}
          y2={forkCoords.y - lineSpacing}
          stroke="white"
        />
        <line
          x1={forkCoords.x}
          y1={forkCoords.y}
          x2={forkCoords.x + FORK_WIDTH * direction}
          y2={forkCoords.y + lineSpacing}
          stroke="white"
        />
      </g>
    );
  };

  // Determine the direction of the fork
  const isDrawLeftToRight =
    relationType === '1:M'
      ? startCoords.x < endCoords.x
      : startCoords.x > endCoords.x;

  const originXMinusFork =
    relationType === 'M:1' ? startCoords.x - FORK_WIDTH : startCoords.x;
  const destinationXMinusFork =
    relationType === '1:M'
      ? endCoords.x + (isDrawLeftToRight ? -1 : 1) * FORK_WIDTH
      : endCoords.x;

  return (
    <svg>
      {/* Base line of the relationship */}
      <line
        x1={originXMinusFork}
        y1={startCoords.y}
        x2={destinationXMinusFork}
        y2={endCoords.y}
        strokeWidth={2}
        stroke="white"
      />

      {/* Draw the fork */}
      {relationType === '1:M' &&
        drawFork(
          { x: destinationXMinusFork, y: endCoords.y },
          isDrawLeftToRight
        )}
      {relationType === 'M:1' &&
        drawFork({ x: originXMinusFork, y: startCoords.y }, !isDrawLeftToRight)}
    </svg>
  );
};

export default DatabaseRelationshipComponent;
