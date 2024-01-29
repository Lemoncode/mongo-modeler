import { Coords, GUID } from '@/core/model';
import { RelationType } from '@/core/providers';
import { getRelationPath } from '../database-relation-two-tables-path.business';

interface Props {
  id: GUID;
  startCoords: Coords;
  endCoords: Coords;
  relationType: RelationType;
  onClick: (relationId: GUID) => void;
  onDoubleClick: (relationId: GUID) => void;
  className?: string;
}

export const ClickablePathComponent: React.FC<Props> = props => {
  const {
    id,
    startCoords,
    endCoords,
    relationType,
    onClick,
    onDoubleClick,
    className,
  } = props;

  const handleClick = (e: React.MouseEvent<SVGLineElement, MouseEvent>) => {
    onClick(id);
    e.stopPropagation();
  };

  return (
    <path
      d={getRelationPath(relationType, startCoords, endCoords)}
      strokeWidth={40}
      stroke="transparent"
      onClick={handleClick}
      onDoubleClick={() => onDoubleClick(id)}
      className={className}
    />
  );
};
