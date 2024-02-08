import { Coords } from '@/core/model';
import { RelationType, TABLE_CONST } from '@/core/providers';
import { selfRelationcalculateOriginMinusFork } from '@/pods/canvas/components/relation/database-relation-self.business';
import { isDrawLeftToRightLogic } from '@/pods/canvas/components/relation/relation.business';
import React from 'react';
import { ForkExportComponent } from './fork-export.component';

interface Props {
  relationType: RelationType;
  startCoords: Coords;
  endCoords: Coords;
}

export const DatabaseRelationSelfExportComponent: React.FC<Props> = props => {
  const { relationType, startCoords, endCoords } = props;
  const isDrawLeftToRight = isDrawLeftToRightLogic(
    relationType,
    startCoords,
    endCoords
  );

  const originXMinusFork = selfRelationcalculateOriginMinusFork(startCoords);

  const oneToOneRelationSelfPath = `
  M ${startCoords.x} ${startCoords.y} 
  H ${startCoords.x - TABLE_CONST.HORIZONTAL_LEFT_EXTENSION} 
  V ${endCoords.y} 
  H ${endCoords.x - TABLE_CONST.TABLE_WIDTH}
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
  H ${endCoords.x - TABLE_CONST.TABLE_WIDTH}
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
        fill="none"
        stroke="#ecad5a"
        strokeWidth={2}
      />

      {/* Draw the fork */}
      {relationType === '1:M' && (
        <ForkExportComponent
          forkCoords={{ x: originXMinusFork, y: endCoords.y }}
          drawLeftToRight={isDrawLeftToRight}
        />
      )}
      {relationType === 'M:1' && (
        <ForkExportComponent
          forkCoords={{ x: originXMinusFork, y: startCoords.y }}
          drawLeftToRight={!isDrawLeftToRight}
        />
      )}
    </svg>
  );
};
