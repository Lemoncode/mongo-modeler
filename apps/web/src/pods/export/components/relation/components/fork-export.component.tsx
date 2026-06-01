import { Coords } from '@/core/model';
import {
  FORK_LINE_SPACING,
  FORK_WIDTH,
} from '@/pods/canvas/components/relation/relation.vm';
import { exportStylesVariables } from '@/pods/export/export-variables.const';

interface Props {
  forkCoords: Coords;
  drawLeftToRight: boolean;
  relationColor?: string;
}

export const ForkExportComponent: React.FC<Props> = props => {
  const { forkCoords, drawLeftToRight, relationColor } = props;
  const direction = drawLeftToRight ? 1 : -1;
  const strokeColor = relationColor ?? exportStylesVariables.RELATION_COLOR;

  return (
    <g>
      {/* Fork lines */}
      <line
        x1={forkCoords.x}
        y1={forkCoords.y}
        x2={forkCoords.x + FORK_WIDTH * direction}
        y2={forkCoords.y}
        stroke={strokeColor}
        strokeWidth={2}
      />
      <line
        x1={forkCoords.x}
        y1={forkCoords.y}
        x2={forkCoords.x + FORK_WIDTH * direction}
        y2={forkCoords.y - FORK_LINE_SPACING}
        stroke={strokeColor}
        strokeWidth={2}
      />
      <line
        x1={forkCoords.x}
        y1={forkCoords.y}
        x2={forkCoords.x + FORK_WIDTH * direction}
        y2={forkCoords.y + FORK_LINE_SPACING}
        stroke={strokeColor}
        strokeWidth={2}
      />
    </g>
  );
};
