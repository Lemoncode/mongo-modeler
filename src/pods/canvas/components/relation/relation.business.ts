import { Coords } from '@/core/model';
import { RelationType } from '@/core/providers';

// TODO: Add unit tests
export const isDrawLeftToRightLogic = (
  relationType: RelationType,
  startCoords: Coords,
  endCoords: Coords
) =>
  relationType === '1:M'
    ? startCoords.x < endCoords.x
    : startCoords.x > endCoords.x;
