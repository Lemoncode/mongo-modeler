import { Coords } from '@/core/model';
import { FORK_WIDTH } from './relation.vm';

export const selfRelationcalculateOriginMinusFork = (startCoords: Coords) =>
  startCoords.x - FORK_WIDTH;
