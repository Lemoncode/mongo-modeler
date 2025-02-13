import { Box } from './autoarrange-table.model';

export const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const isOverlapping = (box1: Box, box2: Box): boolean => {
  return (
    box1.x < box2.x + box2.width &&
    box1.x + box1.width > box2.x &&
    box1.y < box2.y + box2.height &&
    box1.y + box1.height > box2.y
  );
};

export const calculateCollisionArea = (box1: Box, box2: Box): number => {
  const xOverlap = Math.max(
    0,
    Math.min(box1.x + box1.width, box2.x + box2.width) -
      Math.max(box1.x, box2.x)
  );
  const yOverlap = Math.max(
    0,
    Math.min(box1.y + box1.height, box2.y + box2.height) -
      Math.max(box1.y, box2.y)
  );
  return xOverlap * yOverlap;
};
