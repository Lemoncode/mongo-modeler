import { Coords } from '@/core/model';
import { RelationType } from '@/core/providers';

interface Props {
  relationType: RelationType;
  startCoords: Coords;
  endCoords: Coords;
}

export const RelationAdorner: React.FC<Props> = props => {
  const { startCoords, endCoords } = props;

  /*const deltaX = endCoords.x - startCoords.x;
  const deltaY = endCoords.y - endCoords.y;
  const length = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  const offset = 5;

  // Calculating the perpendicular displacement
  const offsetX = -offset * (deltaY / length);
  //const offsetY = offset * (deltaX / length);
  */
  const offsetX = 5;

  return (
    <svg>
      <line
        x1={startCoords.x + offsetX}
        y1={startCoords.y}
        x2={endCoords.x + offsetX}
        y2={endCoords.y}
        stroke="#bbbbbb"
      />
      <line
        x1={startCoords.x - offsetX}
        y1={startCoords.y}
        x2={endCoords.x - offsetX}
        y2={endCoords.y}
        stroke="#bbbbbb"
      />
    </svg>
  );
};
