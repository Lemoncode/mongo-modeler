import { Coords, GUID } from '@/core/model';
import { TABLE_CONST } from '@/core/providers';
import classes from './clickable-path.component.module.css';

interface Props {
  id: GUID;
  startCoords: Coords;
  endCoords: Coords;
  onClick: (relationId: GUID) => void;
  onDoubleClick: (relationId: GUID) => void;
}

export const ClickableSelfComponent: React.FC<Props> = props => {
  const { id, startCoords, endCoords, onClick, onDoubleClick } = props;

  const handleClick = (e: React.MouseEvent<SVGLineElement, MouseEvent>) => {
    onClick(id);
    e.stopPropagation();
  };

  const relationSelfPath = `
  M ${startCoords.x} ${startCoords.y} 
  H ${startCoords.x - TABLE_CONST.HORIZONTAL_LEFT_EXTENSION} 
  V ${endCoords.y} 
  H ${endCoords.x - TABLE_CONST.DEFAULT_TABLE_WIDTH}
  `;

  return (
    <path
      d={relationSelfPath}
      strokeWidth={40}
      stroke="transparent"
      fill="none"
      onClick={handleClick}
      onDoubleClick={() => onDoubleClick(id)}
      className={classes.path}
    />
  );
};
