import { Coords, GUID } from '@/core/model';

interface Props {
  id: GUID;
  startCoords: Coords;
  endCoords: Coords;
  onClick: (relationId: GUID) => void;
  onDoubleClick: (relationId: GUID) => void;
}

export const ClickableLineComponent: React.FC<Props> = props => {
  const { id, startCoords, endCoords, onClick, onDoubleClick } = props;

  const handleClick = (e: React.MouseEvent<SVGLineElement, MouseEvent>) => {
    onClick(id);
    e.stopPropagation();
  };

  return (
    <line
      x1={startCoords.x}
      y1={startCoords.y}
      x2={endCoords.x}
      y2={endCoords.y}
      strokeWidth={25}
      stroke="transparent"
      onClick={handleClick}
      onDoubleClick={() => onDoubleClick(id)}
    />
  );
};
