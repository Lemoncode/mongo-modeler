import { Coords } from '@/core/model';
import { RelationType } from '@/core/providers';
import { FORK_WIDTH } from './relation.vm';

// TODO: Add unit tests
export const isDrawLeftToRightLogic = (
  relationType: RelationType,
  startCoords: Coords,
  endCoords: Coords
) =>
  relationType === '1:M'
    ? startCoords.x < endCoords.x
    : startCoords.x > endCoords.x;

export const calculateOriginMinusForkWidthLogic = (
  relationType: RelationType,
  startCoords: Coords
) => (relationType === 'M:1' ? startCoords.x - FORK_WIDTH : startCoords.x);

export const calculateDestinationXMinusForkLogic = (
  relationType: RelationType,
  endCoords: Coords,
  isDrawLeftToRight: boolean
) =>
  relationType === '1:M'
    ? endCoords.x + (isDrawLeftToRight ? -1 : 1) * FORK_WIDTH
    : endCoords.x;
