// Importaciones necesarias
import React from 'react';
import { FieldVm, TableVm } from '@/core/providers/canvas-schema';
import { TABLE_CONST } from '@/core/providers/canvas-schema/canvas.const';
import { DatabaseTableRow } from './database-table-row.component';
import { exportStylesVariables } from '../../export-variables.const';

interface Props {
  tableInfo: TableVm;
}

const HEADER_TITLE_GAP = 15;

export const DatabaseTable: React.FC<Props> = ({ tableInfo }) => {
  const rowHeight = TABLE_CONST.FONT_SIZE + TABLE_CONST.ROW_PADDING;

  const renderRows = (
    fields: FieldVm[],
    level: number,
    startY: number
  ): [JSX.Element[], number] => {
    let currentY = startY;
    let rows: JSX.Element[] = [];

    fields.forEach(field => {
      const isExpanded = !field.isCollapsed;

      const row = (
        <DatabaseTableRow
          key={field.id}
          field={field}
          level={level}
          currentY={currentY}
        />
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
    number,
  ] => {
    const [rows, totalY] = renderRows(
      tableInfo.fields,
      0,
      TABLE_CONST.HEADER_HEIGHT
    );
    return [rows, totalY + TABLE_CONST.ROW_PADDING]; // Ajuste para el padding final
  }, [tableInfo.fields]);

  return (
    <g transform={`translate(${tableInfo.x}, ${tableInfo.y})`}>
      <rect
        x="0"
        y="0"
        width={TABLE_CONST.TABLE_WIDTH}
        height={totalHeight + HEADER_TITLE_GAP}
        style={{ fill: `${exportStylesVariables.SECONDARY_BACKGROUND}` }}
      />
      <rect
        x="0"
        y="0"
        width={TABLE_CONST.TABLE_WIDTH}
        height={TABLE_CONST.HEADER_HEIGHT}
        style={{ fill: `${exportStylesVariables.HIGHLIGHT_COLOR}` }}
      />
      <text
        x="10"
        y={TABLE_CONST.FONT_SIZE}
        style={{
          fontFamily: "'Arial', sans-serif",
          fontSize: '14px',
          fill: `${exportStylesVariables.TEXT_COLOR}`,
        }}
      >
        {tableInfo.tableName}
      </text>

      <g transform={`translate(0, ${HEADER_TITLE_GAP})`}>{renderedRows}</g>

      <rect
        x="0"
        y="0"
        width={TABLE_CONST.TABLE_WIDTH}
        height={totalHeight + HEADER_TITLE_GAP}
        style={{
          fill: 'none',
          stroke: `${exportStylesVariables.HIGHLIGHT_COLOR}`,
        }}
      />
    </g>
  );
};
