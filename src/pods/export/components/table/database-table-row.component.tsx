import { GUID } from '@/core/model';
import { FieldVm, TableVm } from '@/core/providers/canvas-schema';
import { TABLE_CONST } from '@/core/providers/canvas-schema/canvas.const';

import { exportStylesVariables } from '../../export-variables.const';
import { calculateColumNameWidth } from '@/pods/canvas/components/table/database-table.business';

interface Props {
  tableInfo: TableVm;
  field: FieldVm;
  level: number;
  currentY: number;
  onToggleCollapse: (tableId: GUID, fieldId: GUID) => void;
}

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
const SPACE_BELOW_TEXT = 3;
const SPACE_ARROW_TEXT = TABLE_CONST.FONT_SIZE * 1.5;

export const DatabaseTableRow: React.FC<Props> = props => {
  const { field, tableInfo, level, currentY, onToggleCollapse } = props;

  const isExpandable =
    field.type === 'object' && (field.children?.length ?? 0) > 0;
  const isExpanded = !field.isCollapsed;

  return (
    <g key={field.id} transform={`translate(${MARGIN_LEFT}, ${currentY})`}>
      <g transform={`translate(${level * TABLE_CONST.LEVEL_INDENTATION}, 0)`}>
        {isExpandable && (
          <text
            x={0}
            y={TABLE_CONST.FONT_SIZE}
            style={{
              fill: exportStylesVariables.TEXT_COLOR,
              fontFamily: "'Arial', sans-serif",
              fontSize: '14px',
            }}
            onClick={() => onToggleCollapse(tableInfo.id, field.id)}
          >
            {isExpanded ? '▼' : '►'}
          </text>
        )}
        <clipPath id={`clip_${field.id}`}>
          <rect
            x={SPACE_ARROW_TEXT}
            y={0}
            width={
              COLUMN_NAME_PIXEL_WIDTH -
              SPACE_ARROW_TEXT -
              level * TABLE_CONST.LEVEL_INDENTATION
            }
            height={TABLE_CONST.FONT_SIZE + SPACE_BELOW_TEXT}
          ></rect>
        </clipPath>
        <text
          x={SPACE_ARROW_TEXT}
          y={TABLE_CONST.FONT_SIZE}
          style={{
            fill: exportStylesVariables.TEXT_COLOR,
            fontFamily: 'Arial',
            fontSize: '14px',
          }}
          clipPath={`url(#clip_${field.id})`}
        >
          {field.name}
        </text>
      </g>
      <text
        x={COLUMN_NAME_PIXEL_WIDTH + COLUMN_SPACE_PIXEL_WIDTH}
        y={TABLE_CONST.FONT_SIZE}
        style={{
          fill: exportStylesVariables.TEXT_COLOR,
          fontFamily: 'Arial',
          fontSize: '14px',
        }}
        width={COLUMN_TYPE_PIXEL_WIDTH}
      >
        {field.type}
        {field.isArray ? `[]` : null}
      </text>
      <text
        x={
          COLUMN_NAME_PIXEL_WIDTH +
          COLUMN_SPACE_PIXEL_WIDTH +
          COLUMN_TYPE_PIXEL_WIDTH +
          COLUMN_SPACE_PIXEL_WIDTH
        }
        y={TABLE_CONST.FONT_SIZE}
        width={COLUMN_NOTNULL_PIXEL_WIDTH}
        height={TABLE_CONST.FONT_SIZE}
        style={{
          fill: exportStylesVariables.TEXT_COLOR,
          fontFamily: 'Arial',
          fontSize: '14px',
        }}
      >
        {field.isNN ? `NN` : ''}
      </text>
    </g>
  );
};
