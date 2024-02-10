import { Edit } from '@/common/components';
import { TABLE_CONST } from '@/core/providers';
import { TruncatedText } from './truncated-text.component';
import {
  PENCIL_ICON_WIDTH,
  PENCIL_MARGIN_RIGHT,
  TABLE_BORDER_RADIUS,
  TITLE_MARGIN_LEFT,
} from './database-table.const';
import classes from './database-table.module.css';

interface Props {
  onEditTable: () => void;
  isSelected: boolean;
  tableName: string;
}

export const DatabaseTableHeader: React.FC<Props> = props => {
  const { onEditTable, isSelected, tableName } = props;

  const pencilIconClick = (e: React.MouseEvent<SVGGElement, MouseEvent>) => {
    onEditTable();
    e.stopPropagation();
  };

  return (
    <>
      <rect
        x="0"
        y={TABLE_CONST.HEADER_HEIGHT - 5}
        width={TABLE_CONST.TABLE_WIDTH}
        height="5"
        className={classes.tableHeader}
      />
      <rect
        rx={TABLE_BORDER_RADIUS}
        x="0"
        y="0"
        width={TABLE_CONST.TABLE_WIDTH}
        height={TABLE_CONST.HEADER_HEIGHT}
        className={classes.tableHeader}
        onClick={e => {
          e.stopPropagation();
        }}
        onDoubleClick={onEditTable}
      />
      <TruncatedText
        text={tableName}
        x={TITLE_MARGIN_LEFT}
        y={4}
        width={TABLE_CONST.TABLE_WIDTH - TITLE_MARGIN_LEFT}
        height={TABLE_CONST.FONT_SIZE}
        textClass={classes.tableText}
      />
      {isSelected && (
        <g
          transform={`translate(${TABLE_CONST.TABLE_WIDTH - (PENCIL_ICON_WIDTH - PENCIL_MARGIN_RIGHT)}, 2)`}
          onClick={pencilIconClick}
        >
          <rect
            x="0"
            y="0"
            width={PENCIL_ICON_WIDTH + PENCIL_MARGIN_RIGHT}
            fill="transparent"
            height="25"
            onClick={pencilIconClick}
            style={{ cursor: 'pointer' }}
          />
          <Edit />
        </g>
      )}
    </>
  );
};
