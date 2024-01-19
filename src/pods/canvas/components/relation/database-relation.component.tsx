import React from 'react';
import { RelationType } from '@/core/providers/canvas-schema';
import { Coords, GUID } from '@/core/model';

interface DatabaseRelationshipProps {
  id: GUID;
  relationType: RelationType;
  startCoords: Coords;
  endCoords: Coords;
  onClick: (relationId: GUID) => void;
}

const FORK_WIDTH = 10;
const FORK_LINE_SPACING = 5;

const DatabaseRelationshipComponent: React.FC<DatabaseRelationshipProps> = ({
  id,
  relationType,
  startCoords,
  endCoords,
  onClick,
}) => {
  const drawFork = (forkCoords: Coords, drawLeftToRight: boolean) => {
    const direction = drawLeftToRight ? 1 : -1;

    // TODO: Teresa replace all the stroke "white" to work with the theme
    return (
      <g>
        {/* Fork lines */}
        <line
          x1={forkCoords.x}
          y1={forkCoords.y}
          x2={forkCoords.x + FORK_WIDTH * direction}
          y2={forkCoords.y}
          stroke="#ffae42"
        />
        <line
          x1={forkCoords.x}
          y1={forkCoords.y}
          x2={forkCoords.x + FORK_WIDTH * direction}
          y2={forkCoords.y - FORK_LINE_SPACING}
          stroke="#ffae42"
        />
        <line
          x1={forkCoords.x}
          y1={forkCoords.y}
          x2={forkCoords.x + FORK_WIDTH * direction}
          y2={forkCoords.y + FORK_LINE_SPACING}
          stroke="#ffae42"
        />
      </g>
    );
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
        strokeWidth={20}
        stroke="transparent"
        onClick={() => onClick(id)}
      />
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
        stroke="#ffae42"
      />

      {/* Draw the fork */}
      {relationType === '1:M' &&
        drawFork(
          { x: destinationXMinusFork, y: endCoords.y },
          isDrawLeftToRight
        )}
      {relationType === 'M:1' &&
        drawFork({ x: originXMinusFork, y: startCoords.y }, !isDrawLeftToRight)}

      {drawClickableLine()}
    </svg>
  );
};

export default DatabaseRelationshipComponent;
