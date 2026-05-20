import { TABLE_CONST } from '@/core/providers';
import { TABLE_BORDER_RADIUS } from '../database-table.const';
import classes from '../database-table.module.css';

interface Props {
  totalHeight: number;
  isSelected: boolean;
  width: number;
}

export const DatabaseTableBorder: React.FC<Props> = props => {
  const { totalHeight, isSelected, width } = props;

  const rectStyle = {
    filter: isSelected ? 'url(#table_component_selected)' : 'none', // Apply SVG filter if the table is selected (highlight selected table)
  };

  return (
    <rect
      x="0"
      y="0"
      rx={TABLE_BORDER_RADIUS}
      width={width}
      height={totalHeight + TABLE_CONST.HEADER_TITLE_GAP}
      className={classes.tableBackground}
      style={rectStyle}
      stroke="1.2"
    />
  );
};
