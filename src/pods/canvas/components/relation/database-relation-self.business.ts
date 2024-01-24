import { Coords } from '@/core/model';
import { FORK_WIDTH } from './relation.vm';

export const calculateOriginMinusFork = (startCoords: Coords) =>
  startCoords.x - FORK_WIDTH;
