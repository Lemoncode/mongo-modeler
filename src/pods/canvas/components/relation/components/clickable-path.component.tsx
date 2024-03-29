import { Coords, GUID } from '@/core/model';
import { RelationType } from '@/core/providers';
import { getRelationPath } from '../database-relation-two-tables-path.business';
import classes from './clickable-path.component.module.css';

interface Props {
  id: GUID;
  startCoords: Coords;
  endCoords: Coords;
  relationType: RelationType;
  onClick: (relationId: GUID) => void;
  onDoubleClick: (relationId: GUID) => void;
}

export const ClickablePathComponent: React.FC<Props> = props => {
  const { id, startCoords, endCoords, relationType, onClick, onDoubleClick } =
    props;

  const handleClick = (e: React.MouseEvent<SVGLineElement, MouseEvent>) => {
    onClick(id);
    e.stopPropagation();
  };

  return (
    <path
      d={getRelationPath(relationType, startCoords, endCoords)}
      stroke="transparent"
      strokeWidth={40}
      onClick={handleClick}
      onDoubleClick={() => onDoubleClick(id)}
      className={classes.path}
    />
  );
};
