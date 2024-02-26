import { GUID, Size } from '@/core/model';
import classes from './canvas.pod.module.css';
import {
  DatabaseSchemaVm,
  TABLE_CONST,
  TableVm,
  UpdatePositionFn,
} from '@/core/providers/canvas-schema';
import { DatabaseTable } from './components/table/database-table.component';
import { DatabaseRelationCollectionComponent } from './components/relation';
import { SelectedTableFilterHighlightComponent } from './components/table/components/selected-table-filter-highlight.component';
import { useDraggable } from './components/table/table-drag.hook';
import React from 'react';
import { renderRows } from './components/table/database-table-render-rows.helper';

interface Props {
  viewBoxSize: Size;
  canvasSize: Size;
  canvasSchema: DatabaseSchemaVm;
  onUpdateTablePosition: UpdatePositionFn;
  onToggleCollapse: (tableId: GUID, fieldId: GUID) => void;
  onEditTable: (tableInfo: TableVm) => void;
  onEditRelation: (relationId: GUID) => void;
  onSelectElement: (relationId: GUID | null) => void;
}

const CANVAS_MAX_WIDTH = 20000;
const CANVAS_MAX_HEIGHT = 20000;

export const CanvasSvgComponent: React.FC<Props> = props => {
  const {
    viewBoxSize,
    canvasSize,
    canvasSchema,
    onUpdateTablePosition,
    onToggleCollapse,
    onEditTable,
    onEditRelation,
    onSelectElement,
  } = props;

  const clearSelection = () => {
    onSelectElement(null);
  };

  // const [parent, list] = useDragAndDrop<SVGElement, TableVm>(
  //   canvasSchema.tables
  // );

  const refs = canvasSchema.tables.map(table => {
    const rowHeight = TABLE_CONST.FONT_SIZE + TABLE_CONST.ROW_PADDING;

    const [renderedRows, totalHeight] = React.useMemo((): [
      JSX.Element[],
      number,
    ] => {
      const [rows, totalY] = renderRows(
        {
          tableInfo: table,
          fields: table.fields,
          level: 0,
          startY: TABLE_CONST.HEADER_HEIGHT,
          rowHeight,
        },
        {
          onToggleCollapse,
        }
      );
      return [rows, totalY + TABLE_CONST.ROW_PADDING]; // Adjust for the last padding
    }, [table.fields]);
    return useDraggable(
      onUpdateTablePosition,
      canvasSize,
      totalHeight,
      table,
      table.id
    );
  });

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={classes.containerSvg}
      viewBox={`0 0 ${viewBoxSize.width} ${viewBoxSize.height}`}
      width={CANVAS_MAX_WIDTH}
      height={CANVAS_MAX_HEIGHT}
      onClick={clearSelection}
    >
      <SelectedTableFilterHighlightComponent />
      {canvasSchema.tables.map((table, index) => (
        <g
          key={table.id}
          transform={`translate(${table.x}, ${table.y})`}
          className={classes.tableContainer}
          ref={refs[index][0]}
        >
          <DatabaseTable
            tableInfo={table}
            onToggleCollapse={onToggleCollapse}
            onEditTable={onEditTable}
            isSelected={canvasSchema.selectedElementId === table.id}
            selectTable={onSelectElement}
          />
        </g>
      ))}
      <DatabaseRelationCollectionComponent
        schema={canvasSchema}
        onEditRelation={onEditRelation}
        onSelectRelation={onSelectElement}
      />
    </svg>
  );
};
