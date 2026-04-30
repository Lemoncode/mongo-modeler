import React from 'react';
import { Coords } from '@/core/model';
import { RelationType } from '@/core/providers';
import {
  calculateDestinationXMinusForkLogic,
  calculateOriginMinusForkWidthLogic,
  isDrawLeftToRightLogic,
} from '@/pods/canvas/components/relation/relation.business';
import { exportStylesVariables } from '@/pods/export/export-variables.const';
import { ForkExportComponent } from './fork-export.component';

interface Props {
  relationType: RelationType;
  startCoords: Coords;
  endCoords: Coords;
}

export const DatabaseRelationshipTwoTablesStraightExportComponent: React.FC<
  Props
> = props => {
  const { relationType, startCoords, endCoords } = props;
  // Determine the direction of the fork
  const isDrawLeftToRight = isDrawLeftToRightLogic(
    relationType,
    startCoords,
    endCoords
  );

  const originXMinusFork = calculateOriginMinusForkWidthLogic(
    relationType,
    startCoords,
    isDrawLeftToRight
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
        stroke={exportStylesVariables.RELATION_COLOR}
        strokeWidth={2}
      />

      {/* Draw the fork */}
      {relationType === '1:M' && (
        <ForkExportComponent
          forkCoords={{ x: destinationXMinusFork, y: endCoords.y }}
          drawLeftToRight={isDrawLeftToRight}
        />
      )}
      {relationType === 'M:1' && (
        <ForkExportComponent
          forkCoords={{ x: originXMinusFork, y: startCoords.y }}
          drawLeftToRight={isDrawLeftToRight}
        />
      )}
    </svg>
  );
};
