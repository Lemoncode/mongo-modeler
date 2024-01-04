// Importaciones necesarias
import React from 'react';
import { Coords } from '@/core/model';
import { FieldVm, TableVm, GUID, Size } from '../../canvas.vm';
import { useDraggable } from './table-drag.hook';
import {
  FONT_SIZE,
  ROW_PADDING,
  LEVEL_INDENTATION,
  COLLAPSE_ICON_X,
  FIELD_NAME_X_OFFSET,
  FIELD_TYPE_X,
  TABLE_WIDTH,
  HEADER_HEIGHT
} from './database-table.const';
import { useModalDialogContext } from '@/core/providers';
import { EditTable } from '@/pods/edit-table';
import classes from './database-table.module.css';

interface Props {
  tableInfo: TableVm;
  updatePosition: (
    id: string,
    position: Coords,
    totalHeight: number,
    canvasSize: Size
  ) => void;
  onToggleCollapse: (tableId: GUID, fieldId: GUID) => void;
}

export const DatabaseTable: React.FC<Props> = ({
  tableInfo,
  updatePosition,
  onToggleCollapse
}) => {
  const rowHeight = FONT_SIZE + ROW_PADDING;

  const renderRows = (
    fields: FieldVm[],
    level: number,
    startY: number
  ): [JSX.Element[], number] => {
    let currentY = startY;
    let rows: JSX.Element[] = [];

    fields.forEach(field => {
      const isExpandable =
        field.type === 'object' && (field.children?.length ?? 0) > 0;
      const isExpanded = !field.isCollapsed;

      const row = (
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

      rows.push(row);
      currentY += rowHeight;

      if (isExpanded && field.children) {
        const [childRows, newY] = renderRows(
          field.children,
          level + 1,
          currentY
        );
        rows = rows.concat(childRows);
        currentY = newY;
      }
    });

    return [rows, currentY];
  };

  const [renderedRows, totalHeight] = React.useMemo((): [
    JSX.Element[],
    number
  ] => {
    const [rows, totalY] = renderRows(tableInfo.fields, 0, HEADER_HEIGHT);
    return [rows, totalY + ROW_PADDING]; // Ajuste para el padding final
  }, [tableInfo.fields]);

  const { onMouseDown } = useDraggable(
    tableInfo.id,
    tableInfo.x,
    tableInfo.y,
    updatePosition,
    totalHeight
  );
  const { openModal } = useModalDialogContext();
  const handleDoubleClick = () => {
    openModal(<EditTable />);
  };
  return (
    <g
      transform={`translate(${tableInfo.x}, ${tableInfo.y})`}
      onMouseDown={onMouseDown}
      className={classes.tableContainer}
    >
      <rect
        x="0"
        y="0"
        width={TABLE_WIDTH}
        height={totalHeight}
        className={classes.tableBackground}
      />
      <rect
        x="0"
        y="0"
        width={TABLE_WIDTH}
        height={HEADER_HEIGHT}
        className={classes.tableHeader}
        onDoubleClick={handleDoubleClick}
      />
      <text x="10" y={FONT_SIZE} className={classes.tableText}>
        {tableInfo.tableName}
      </text>

      {renderedRows}

      <rect
        x="0"
        y="0"
        width={TABLE_WIDTH}
        height={totalHeight}
        className={classes.table}
      />
    </g>
  );
};
