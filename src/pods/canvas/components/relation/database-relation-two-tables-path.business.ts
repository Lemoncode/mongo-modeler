import { Coords } from '@/core/model';
import { RelationType, TABLE_CONST } from '@/core/providers';

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

  if (relationType === '1:1') {
    return startCoords.x >= endCoords.x
      ? leftHandSideOneToOnePath
      : rightHandSideOneToOnePath;
  }
};
