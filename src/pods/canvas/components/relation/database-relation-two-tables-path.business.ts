import { Coords } from '@/core/model';
import { RelationType, TABLE_CONST } from '@/core/providers';
import { FORK_WIDTH } from './relation.vm';

export const getRelationPath = (
  relationType: RelationType,
  startCoords: Coords,
  endCoords: Coords
) => {
  const leftHandSideOneToOnePath = `
M ${startCoords.x - TABLE_CONST.TABLE_WIDTH} ${startCoords.y} 
H ${startCoords.x - (TABLE_CONST.TABLE_WIDTH + TABLE_CONST.HORIZONTAL_LEFT_EXTENSION)} 
V ${endCoords.y} 
H ${endCoords.x}
`;

  const rightHandSideOneToOnePath = `
M ${startCoords.x + TABLE_CONST.TABLE_WIDTH} ${startCoords.y}
H ${startCoords.x + TABLE_CONST.TABLE_WIDTH + TABLE_CONST.HORIZONTAL_LEFT_EXTENSION}
V ${endCoords.y}
H ${endCoords.x}
`;

  const leftHandSideOneToManyPath = `
M ${startCoords.x - TABLE_CONST.TABLE_WIDTH} ${startCoords.y} 
H ${startCoords.x - (TABLE_CONST.TABLE_WIDTH + TABLE_CONST.HORIZONTAL_LEFT_EXTENSION)} 
V ${endCoords.y} 
H ${endCoords.x - FORK_WIDTH}
`;

  const rightHandSideOneToManyPath = `
M ${startCoords.x + TABLE_CONST.TABLE_WIDTH} ${startCoords.y}
H ${startCoords.x + TABLE_CONST.TABLE_WIDTH + TABLE_CONST.HORIZONTAL_LEFT_EXTENSION}
V ${endCoords.y}
H ${endCoords.x + FORK_WIDTH}
`;

  const leftHandSideManyToOnePath = `
M ${startCoords.x - TABLE_CONST.TABLE_WIDTH - FORK_WIDTH} ${startCoords.y}
H ${startCoords.x - (TABLE_CONST.TABLE_WIDTH + TABLE_CONST.HORIZONTAL_LEFT_EXTENSION)}
V ${endCoords.y}
H ${endCoords.x}
`;

  const rightHandSideManyToOnePath = `
M ${startCoords.x + TABLE_CONST.TABLE_WIDTH + FORK_WIDTH} ${startCoords.y}
H ${startCoords.x + TABLE_CONST.TABLE_WIDTH + TABLE_CONST.HORIZONTAL_LEFT_EXTENSION}
V ${endCoords.y}
H ${endCoords.x}
`;

  if (relationType === '1:1') {
    return startCoords.x >= endCoords.x
      ? leftHandSideOneToOnePath
      : rightHandSideOneToOnePath;
  }

  if (relationType === '1:M') {
    return startCoords.x >= endCoords.x
      ? leftHandSideOneToManyPath
      : rightHandSideOneToManyPath;
  }

  if (relationType === 'M:1') {
    return startCoords.x >= endCoords.x
      ? leftHandSideManyToOnePath
      : rightHandSideManyToOnePath;
  }
};

export const getForkCoords = (
  relationType: RelationType,
  startCoords: Coords,
  endCoords: Coords
): Coords => {
  const leftForkCoordsOneToManyPath: Coords = {
    x: endCoords.x - FORK_WIDTH,
    y: endCoords.y,
  };
  const rightForkCoordsOneToManyPath: Coords = {
    x: endCoords.x + FORK_WIDTH,
    y: endCoords.y,
  };

  const leftForkCoordsManyToOnePath: Coords = {
    x: startCoords.x - TABLE_CONST.TABLE_WIDTH - FORK_WIDTH,
    y: startCoords.y,
  };

  const rightForkCoordsManyToOnePath: Coords = {
    x: startCoords.x + TABLE_CONST.TABLE_WIDTH + FORK_WIDTH,
    y: startCoords.y,
  };

  if (relationType === '1:M') {
    return startCoords.x >= endCoords.x
      ? leftForkCoordsOneToManyPath
      : rightForkCoordsOneToManyPath;
  }

  if (relationType === 'M:1') {
    return startCoords.x >= endCoords.x
      ? leftForkCoordsManyToOnePath
      : rightForkCoordsManyToOnePath;
  }

  return { x: 0, y: 0 };
};
