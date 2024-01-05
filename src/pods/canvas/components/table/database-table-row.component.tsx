import { GUID } from '@/core/model';
import { FieldVm, TableVm } from '../../canvas.vm';
import {
  COLLAPSE_ICON_X,
  FIELD_NAME_X_OFFSET,
  FIELD_TYPE_X,
  FONT_SIZE,
  LEVEL_INDENTATION,
} from './database-table.const';
import classes from './database-table.module.css';

interface Props {
  tableInfo: TableVm;
  field: FieldVm;
  level: number;
  currentY: number;
  onToggleCollapse: (tableId: GUID, fieldId: GUID) => void;
}

export const DatabaseTableRow: React.FC<Props> = props => {
  const { field, tableInfo, level, currentY, onToggleCollapse } = props;

  const isExpandable =
    field.type === 'object' && (field.children?.length ?? 0) > 0;
  const isExpanded = !field.isCollapsed;

  return (
    <g key={field.id} transform={`translate(0, ${currentY})`}>
      <g transform={`translate(${level * LEVEL_INDENTATION}, 0)`}>
        {isExpandable && (
          <text
            x={COLLAPSE_ICON_X}
            y={FONT_SIZE}
            className={classes.tableTextRow}
            onClick={() => onToggleCollapse(tableInfo.id, field.id)}
          >
            {isExpanded ? '▼' : '►'}
          </text>
        )}
        <text
          x={FIELD_NAME_X_OFFSET + (isExpandable ? 15 : 0)}
          y={FONT_SIZE}
          className={classes.tableTextRow}
        >
          {field.name}
        </text>
      </g>
      <text x={FIELD_TYPE_X} y={FONT_SIZE} className={classes.tableTextRow}>
        {field.type}
      </text>
    </g>
  );
};
