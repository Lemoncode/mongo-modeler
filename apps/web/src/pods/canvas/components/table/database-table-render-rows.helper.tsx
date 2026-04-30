import { FieldVm, TableVm } from '@/core/providers';
import { DatabaseTableRow } from './components';
import { GUID } from '@/core/model';

interface Info {
  tableInfo: TableVm;
  fields: FieldVm[];
  level: number;
  startY: number;
  rowHeight: number;
  tableWidth: number;
}

interface Events {
  onToggleCollapse: (tableId: GUID, fieldId: GUID) => void;
}

export const renderRows = (
  info: Info,
  events: Events
): [JSX.Element[], number] => {
  const { tableInfo, fields, level, rowHeight, startY, tableWidth } = info;
  const { onToggleCollapse } = events;

  let currentY = startY;
  let rows: JSX.Element[] = [];

  fields.forEach(field => {
    const isExpanded = !field.isCollapsed;

    const row = (
      <DatabaseTableRow
        key={field.id}
        field={field}
        tableInfo={tableInfo}
        level={level}
        currentY={currentY}
        onToggleCollapse={onToggleCollapse}
        tableWidth={tableWidth}
      />
    );

    rows.push(row);
    currentY += rowHeight;

    if (isExpanded && field.children) {
      const [childRows, newY] = renderRows(
        {
          tableInfo,
          fields: field.children,
          level: level + 1,
          startY: currentY,
          rowHeight,
          tableWidth,
        },
        events
      );

      rows = rows.concat(childRows);
      currentY = newY;
    }
  });

  return [rows, currentY];
};
