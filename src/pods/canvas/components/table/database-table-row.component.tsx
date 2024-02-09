import { GUID } from '@/core/model';
import { FieldVm, TableVm } from '@/core/providers/canvas-schema';
import classes from './database-table.module.css';
import { TABLE_CONST } from '@/core/providers/canvas-schema/canvas.const';
// import { calculateDBColumnsWidth } from '@/pods/edit-table/edit-table.business';
import { TruncatedText } from './truncated-text.component';

interface Props {
  tableInfo: TableVm;
  field: FieldVm;
  level: number;
  currentY: number;
  onToggleCollapse: (tableId: GUID, fieldId: GUID) => void;
}

const calculateColumNameWidth = (
  widths: number[],
  tableSize: number
): number => {
  const totalWidth = widths.reduce((prev, curr) => prev + curr, 0);
  return tableSize - totalWidth;
};
const MARGIN_LEFT = 10;
const MARGIN_RIGHT = 14;
const TABLE_CLEAN_WIDTH =
  TABLE_CONST.DEFAULT_TABLE_WIDTH - MARGIN_LEFT - MARGIN_RIGHT;
const COLUMN_TYPE_PIXEL_WIDTH = 80;
const COLUMN_NOTNULL_PIXEL_WIDTH = 22;

const COLUMN_SPACE_PIXEL_WIDTH = TABLE_CONST.FONT_SIZE * 1.5;
const COLUMN_NAME_PIXEL_WIDTH = calculateColumNameWidth(
  [
    COLUMN_TYPE_PIXEL_WIDTH,
    COLUMN_SPACE_PIXEL_WIDTH,
    COLUMN_NOTNULL_PIXEL_WIDTH,
    COLUMN_SPACE_PIXEL_WIDTH,
  ],
  TABLE_CLEAN_WIDTH
);

const SPACE_ARROW_TEXT = TABLE_CONST.FONT_SIZE * 1.5;

export const DatabaseTableRow: React.FC<Props> = props => {
  const { field, tableInfo, level, currentY, onToggleCollapse } = props;

  const isExpandable =
    field.type === 'object' && (field.children?.length ?? 0) > 0;
  const isExpanded = !field.isCollapsed;
  // const columnWidths = calculateDBColumnsWidth(
  //   [FIELD_NAME_WIDTH_PERCENTAGE, FIELD_TYPE_WIDTH_PERCENTAGE],
  //   TABLE_CLEAN_WIDTH
  // );

  return (
    <g key={field.id} transform={`translate(${MARGIN_LEFT}, ${currentY})`}>
      <g transform={`translate(${level * TABLE_CONST.LEVEL_INDENTATION}, 0)`}>
        {isExpandable && (
          <text
            x={0}
            y={TABLE_CONST.FONT_SIZE}
            className={classes.tableTextRow}
            onClick={() => onToggleCollapse(tableInfo.id, field.id)}
          >
            {isExpanded ? '▼' : '►'}
          </text>
        )}
        <TruncatedText
          text={field.name}
          x={SPACE_ARROW_TEXT}
          y={0}
          width={
            COLUMN_NAME_PIXEL_WIDTH -
            SPACE_ARROW_TEXT -
            level * TABLE_CONST.LEVEL_INDENTATION
          }
          height={TABLE_CONST.FONT_SIZE}
        />
      </g>
      <TruncatedText
        text={`${field.type}${field.isArray ? `[]` : ''}`}
        x={COLUMN_NAME_PIXEL_WIDTH + COLUMN_SPACE_PIXEL_WIDTH}
        y={0}
        width={COLUMN_TYPE_PIXEL_WIDTH}
        height={TABLE_CONST.FONT_SIZE}
      />
      <TruncatedText
        text={`${field.isNN ? `NN` : ''}`}
        x={
          COLUMN_NAME_PIXEL_WIDTH +
          COLUMN_SPACE_PIXEL_WIDTH +
          COLUMN_TYPE_PIXEL_WIDTH +
          COLUMN_SPACE_PIXEL_WIDTH
        }
        y={0}
        width={COLUMN_NOTNULL_PIXEL_WIDTH}
        height={TABLE_CONST.FONT_SIZE}
      />
    </g>
  );
};
