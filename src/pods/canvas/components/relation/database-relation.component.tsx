import React from 'react';
import { RelationType } from '../../canvas.vm';
import { Coords } from '@/core/model';

interface DatabaseRelationshipProps {
  relationType: RelationType;
  startCoords: Coords;
  endCoords: Coords;
}

const DatabaseRelationshipComponent: React.FC<DatabaseRelationshipProps> = ({
  relationType,
  startCoords,
  endCoords,
}) => {
  const drawFork = (forkCoords: Coords, drawLeftToRight: boolean) => {
    const forkLength = 10;
    const lineSpacing = 5; // Spacing between the lines of the fork
    const direction = drawLeftToRight ? 1 : -1;

    return (
      <g>
        {/* Fork lines */}
        <line
          x1={forkCoords.x}
          y1={forkCoords.y}
          x2={forkCoords.x + forkLength * direction}
          y2={forkCoords.y}
          stroke="black"
        />
        <line
          x1={forkCoords.x}
          y1={forkCoords.y}
          x2={forkCoords.x + forkLength * direction}
          y2={forkCoords.y - lineSpacing}
          stroke="black"
        />
        <line
          x1={forkCoords.x}
          y1={forkCoords.y}
          x2={forkCoords.x + forkLength * direction}
          y2={forkCoords.y + lineSpacing}
          stroke="black"
        />
      </g>
    );
  };

  // Determine the direction of the fork
  const isDrawLeftToRight =
    relationType === '1:M'
      ? startCoords.x < endCoords.x
      : startCoords.x > endCoords.x;

  return (
    <svg>
      {/* Base line of the relationship */}
      <line
        x1={startCoords.x}
        y1={startCoords.y}
        x2={endCoords.x}
        y2={endCoords.y}
        stroke="black"
      />

      {/* Draw the fork */}
      {relationType === '1:M' && drawFork(endCoords, isDrawLeftToRight)}
      {relationType === 'M:1' && drawFork(startCoords, !isDrawLeftToRight)}
    </svg>
  );
};

export default DatabaseRelationshipComponent;
