import { Size } from '@/core/model';
import { Box } from './autoarrange-table.model';
import {
  calculateCollisionArea,
  isOverlapping,
} from './autoarrange-table.utils';

function* spiralPositions(
  centerX: number,
  centerY: number,
  canvasSize: Size
): Generator<[number, number]> {
  let x = 0,
    y = 0,
    dx = 0,
    dy = -1;

  for (let i = 0; i < Math.max(canvasSize.width, canvasSize.height) ** 2; i++) {
    if (
      -canvasSize.width / 2 < x &&
      x < canvasSize.width / 2 &&
      -canvasSize.height / 2 < y &&
      y < canvasSize.height / 2
    ) {
      yield [centerX + x, centerY + y];
    }
    if (x === y || (x < 0 && x === -y) || (x > 0 && x === 1 - y)) {
      [dx, dy] = [-dy, dx];
    }
    x += dx;
    y += dy;
  }
}

export function findFreePositionOrMinCollision(
  boxes: Box[],
  newBoxSize: Size,
  canvasSize: Size
): Box | null {
  const centerX = Math.floor(canvasSize.width / 2);
  const centerY = Math.floor(canvasSize.height / 2);
  let minCollisionBox: Box | null = null;
  let minCollisionArea = Infinity;

  for (const [x, y] of spiralPositions(centerX, centerY, canvasSize)) {
    const newBox = {
      x,
      y,
      width: newBoxSize.width,
      height: newBoxSize.height,
    };
    if (
      x >= 0 &&
      y >= 0 &&
      x + newBoxSize.width <= canvasSize.width &&
      y + newBoxSize.height <= canvasSize.height
    ) {
      let collisionArea = 0;
      let isFree = true;

      for (const existingBox of boxes) {
        if (isOverlapping(newBox, existingBox)) {
          isFree = false;
          collisionArea += calculateCollisionArea(newBox, existingBox);
        }
      }

      if (isFree) {
        return newBox;
      }

      if (collisionArea < minCollisionArea) {
        minCollisionArea = collisionArea;
        minCollisionBox = newBox;
      }
    }
  }

  if (minCollisionBox !== null) {
    return minCollisionBox;
  }
  // TODO: if no free position is found, return a random one
  return null;
}
