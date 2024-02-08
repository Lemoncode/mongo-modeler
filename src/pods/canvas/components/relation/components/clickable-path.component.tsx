import { Coords, GUID } from '@/core/model';
import { RelationType } from '@/core/providers';
import { getRelationPath } from '../database-relation-two-tables-path.business';
import classes from './clickable-path.component.module.css';

interface Props {
  id: GUID;
  startCoords: Coords;
  endCoords: Coords;
  relationType: RelationType;
  onClick?: (relationId: GUID) => void;
  onDoubleClick?: (relationId: GUID) => void;
}

export const ClickablePathComponent: React.FC<Props> = props => {
  const { id, startCoords, endCoords, relationType, onClick, onDoubleClick } =
    props;

  const handleClick = (e: React.MouseEvent<SVGLineElement, MouseEvent>) => {
    if (onClick) {
      onClick(id);
    }
    e.stopPropagation();
  };

  const handleDoubleClick = () => {
    if (onDoubleClick) {
      onDoubleClick(id);
    }
  };

  return (
    <path
      d={getRelationPath(relationType, startCoords, endCoords)}
      strokeWidth={40}
      stroke="transparent"
      fill="none"
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      className={classes.path}
    />
  );
};
