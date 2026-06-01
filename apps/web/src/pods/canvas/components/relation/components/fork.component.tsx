import React from 'react';
import { Coords } from '@/core/model';
import { FORK_LINE_SPACING, FORK_WIDTH } from '../relation.vm';
import classes from './fork.component.module.css';

interface Props {
  isSelected: boolean;
  forkCoords: Coords;
  drawLeftToRight: boolean;
  relationColor?: string;
}

export const ForkComponent: React.FC<Props> = props => {
  const { forkCoords, drawLeftToRight, isSelected, relationColor } = props;
  const direction = drawLeftToRight ? 1 : -1;
  const relationStrokeStyle = relationColor
    ? { stroke: relationColor }
    : undefined;

  return (
    <g>
      {/* Fork lines */}
      <line
        x1={forkCoords.x}
        y1={forkCoords.y}
        x2={forkCoords.x + FORK_WIDTH * direction}
        y2={forkCoords.y}
        className={
          isSelected ? classes.selectedRelation : classes.nonSelectedRelation
        }
        style={relationStrokeStyle}
      />
      <line
        x1={forkCoords.x}
        y1={forkCoords.y}
        x2={forkCoords.x + FORK_WIDTH * direction}
        y2={forkCoords.y - FORK_LINE_SPACING}
        className={
          isSelected ? classes.selectedRelation : classes.nonSelectedRelation
        }
        style={relationStrokeStyle}
      />
      <line
        x1={forkCoords.x}
        y1={forkCoords.y}
        x2={forkCoords.x + FORK_WIDTH * direction}
        y2={forkCoords.y + FORK_LINE_SPACING}
        className={
          isSelected ? classes.selectedRelation : classes.nonSelectedRelation
        }
        style={relationStrokeStyle}
      />
    </g>
  );
};
