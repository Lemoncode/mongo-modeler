import { Edit } from '@/common/components';
import { TABLE_CONST } from '@/core/providers';
import { TruncatedText } from './truncated-text.component';
import {
  PENCIL_ICON_HEIGHT,
  PENCIL_ICON_WIDTH,
  PENCIL_MARGIN_RIGHT,
  TABLE_BORDER_RADIUS,
  TITLE_MARGIN_LEFT,
} from '../database-table.const';
import classes from '../database-table.module.css';

interface Props {
  onEditTable: () => void;
  isSelected: boolean;
  tableName: string;
  onSelectTable: () => void;
}

export const DatabaseTableHeader: React.FC<Props> = props => {
  const { onEditTable, isSelected, tableName, onSelectTable } = props;

  const handlePencilIconClick = (
    e: React.MouseEvent<SVGGElement, MouseEvent>
  ) => {
    onEditTable();
    e.stopPropagation();
  };

  const handleClick = (e: React.MouseEvent<SVGGElement, MouseEvent>) => {
    onSelectTable();
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
      {/* Trick: in a div in HTML/CSS you can define border radius only for top, in SVG not, that's why
          we draw a first rect square and a second rect with border radius */}
      <rect
        rx={TABLE_BORDER_RADIUS}
        x="0"
        y="0"
        width={TABLE_CONST.TABLE_WIDTH}
        height={TABLE_CONST.HEADER_HEIGHT}
        className={classes.tableHeader}
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
          onClick={handlePencilIconClick}
        >
          <rect
            x="0"
            y="0"
            width={PENCIL_ICON_WIDTH + PENCIL_MARGIN_RIGHT}
            fill="transparent"
            height={PENCIL_ICON_HEIGHT}
            onClick={handlePencilIconClick}
            style={{ cursor: 'pointer' }}
          />
          <Edit />
        </g>
      )}
      {/* Clikable area to select the table or edit it*/}
      <rect
        x="0"
        y="0"
        width={
          isSelected
            ? TABLE_CONST.TABLE_WIDTH - PENCIL_ICON_WIDTH
            : TABLE_CONST.TABLE_WIDTH
        }
        height={TABLE_CONST.HEADER_HEIGHT}
        fill="transparent"
        onClick={handleClick}
        onDoubleClick={onEditTable}
        style={{ cursor: 'pointer' }}
      />
    </>
  );
};
