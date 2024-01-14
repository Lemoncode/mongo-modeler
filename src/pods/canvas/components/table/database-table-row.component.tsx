import { GUID } from '@/core/model';
import { FieldVm, TableVm } from '@/core/providers/canvas-schema';
import classes from './database-table.module.css';
import { TABLE_CONST } from '@/core/providers/canvas-schema/canvas.const';
import { calculateDBColumnsWidth } from '@/pods/edit-table/edit-table.business';

interface Props {
  tableInfo: TableVm;
  field: FieldVm;
  level: number;
  currentY: number;
  onToggleCollapse: (tableId: GUID, fieldId: GUID) => void;
}

const FIELD_NAME_WIDTH_PERCENTAGE = 70;
const FIELD_TYPE_WIDTH_PERCENTAGE = 30;

export const DatabaseTableRow: React.FC<Props> = props => {
  const { field, tableInfo, level, currentY, onToggleCollapse } = props;

  const isExpandable =
    field.type === 'object' && (field.children?.length ?? 0) > 0;
  const isExpanded = !field.isCollapsed;
  const columnWidths = calculateDBColumnsWidth(
    [FIELD_NAME_WIDTH_PERCENTAGE, FIELD_TYPE_WIDTH_PERCENTAGE],
    TABLE_CONST.DEFAULT_TABLE_WIDTH
  );

  return (
    <g key={field.id} transform={`translate(0, ${currentY})`}>
      <g transform={`translate(${level * TABLE_CONST.LEVEL_INDENTATION}, 0)`}>
        {isExpandable && (
          <text
            x={TABLE_CONST.COLLAPSE_ICON_X}
            y={TABLE_CONST.FONT_SIZE}
            className={classes.tableTextRow}
            onClick={() => onToggleCollapse(tableInfo.id, field.id)}
          >
            {isExpanded ? '▼' : '►'}
          </text>
        )}
        <text
          x={TABLE_CONST.FIELD_NAME_X_OFFSET + (isExpandable ? 15 : 0)}
          y={TABLE_CONST.FONT_SIZE}
          className={classes.tableTextRow}
        >
          {field.name}
        </text>
      </g>
      <text
        x={columnWidths[0] + columnWidths[1] - 70}
        y={TABLE_CONST.FONT_SIZE}
        className={classes.tableTextRow}
      >
        {field.type}
        {field.isArray ? `[]` : null}
      </text>
    </g>
  );
};
