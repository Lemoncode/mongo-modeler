import { Coords } from '@/core/model';
import {
  FORK_LINE_SPACING,
  FORK_WIDTH,
} from '@/pods/canvas/components/relation/relation.vm';

interface Props {
  forkCoords: Coords;
  drawLeftToRight: boolean;
}

export const ForkExportComponent: React.FC<Props> = props => {
  const { forkCoords, drawLeftToRight } = props;
  const direction = drawLeftToRight ? 1 : -1;

  return (
    <g>
      {/* Fork lines */}
      <line
        x1={forkCoords.x}
        y1={forkCoords.y}
        x2={forkCoords.x + FORK_WIDTH * direction}
        y2={forkCoords.y}
        stroke="#ecad5a"
        strokeWidth={2}
      />
      <line
        x1={forkCoords.x}
        y1={forkCoords.y}
        x2={forkCoords.x + FORK_WIDTH * direction}
        y2={forkCoords.y - FORK_LINE_SPACING}
        stroke="#ecad5a"
        strokeWidth={2}
      />
      <line
        x1={forkCoords.x}
        y1={forkCoords.y}
        x2={forkCoords.x + FORK_WIDTH * direction}
        y2={forkCoords.y + FORK_LINE_SPACING}
        stroke="#ecad5a"
        strokeWidth={2}
      />
    </g>
  );
};
