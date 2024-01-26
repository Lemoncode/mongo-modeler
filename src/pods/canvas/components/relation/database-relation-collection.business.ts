import { TABLE_CONST } from '@/core/providers';

export const isOverLapping = (
  fromTableXCoord: number,
  toTableXCoord: number
): boolean =>
  fromTableXCoord + TABLE_CONST.TABLE_WIDTH >= toTableXCoord &&
  fromTableXCoord <= toTableXCoord + TABLE_CONST.TABLE_WIDTH;
