import { Coords } from '@/core/model';
import { FORK_LINE_SPACING, FORK_WIDTH } from '../relation.vm';
import classes from './fork.component.module.css';

interface Props {
  isSelected: boolean;
  forkCoords: Coords;
  drawLeftToRight: boolean;
}

export const ForkComponent: React.FC<Props> = props => {
  const { forkCoords, drawLeftToRight, isSelected } = props;
  const direction = drawLeftToRight ? 1 : -1;

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
        strokeWidth={2}
        stroke="#ecad5a"
      />
      <line
        x1={forkCoords.x}
        y1={forkCoords.y}
        x2={forkCoords.x + FORK_WIDTH * direction}
        y2={forkCoords.y - FORK_LINE_SPACING}
        className={isSelected ? classes.selectedRelation : ''}
        strokeWidth={2}
        stroke="#ecad5a"
      />
      <line
        x1={forkCoords.x}
        y1={forkCoords.y}
        x2={forkCoords.x + FORK_WIDTH * direction}
        y2={forkCoords.y + FORK_LINE_SPACING}
        className={
          isSelected ? classes.selectedRelation : classes.nonSelectedRelation
        }
        strokeWidth={2}
        stroke="#ecad5a"
      />
    </g>
  );
};
