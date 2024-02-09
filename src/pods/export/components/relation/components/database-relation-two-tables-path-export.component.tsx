import React from 'react';
import { Coords } from '@/core/model';
import { RelationType } from '@/core/providers';
import { isDrawLeftToRightLogic } from '@/pods/canvas/components/relation/relation.business';
import {
  getForkCoords,
  getRelationPath,
} from '@/pods/canvas/components/relation/database-relation-two-tables-path.business';
import { ForkExportComponent } from './fork-export.component';
import { exportStylesVariables } from '@/pods/export/export-variables.const';

interface Props {
  relationType: RelationType;
  startCoords: Coords;
  endCoords: Coords;
}

export const DatabaseRelationshipTwoTablePathExportComponent: React.FC<
  Props
> = props => {
  const { relationType, startCoords, endCoords } = props;

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
        fill="none"
        stroke={exportStylesVariables.RELATION_COLOR}
        strokeWidth={2}
      />

      {/* Draw the fork */}
      {relationType === '1:M' && (
        <ForkExportComponent
          forkCoords={getForkCoords(relationType, startCoords, endCoords)}
          drawLeftToRight={!isDrawLeftToRight}
        />
      )}
      {relationType === 'M:1' && (
        <ForkExportComponent
          forkCoords={getForkCoords(relationType, startCoords, endCoords)}
          drawLeftToRight={isDrawLeftToRight}
        />
      )}
    </svg>
  );
};
