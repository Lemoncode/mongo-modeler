import React from 'react';
import { produce } from 'immer';
import { mockSchema } from './canvas.mock.data';
import { FieldVm, GUID } from './canvas.vm';
import { DatabaseTable } from './components/table/database-table.component';
import { useCanvasViewSettingsContext } from '@/core/providers';
import classes from './canvas.pod.module.css';

interface Size {
  width: number;
  height: number;
}

export const CanvasPod: React.FC = () => {
  const [schema, setSchema] = React.useState(() => mockSchema);
  const { canvasViewSettings } = useCanvasViewSettingsContext();
  const { canvasSize, zoomFactor } = canvasViewSettings;

  const viewBoxSize: Size = React.useMemo<Size>(
    () => ({
      width: canvasSize.width * zoomFactor,
      height: canvasSize.height * zoomFactor,
    }),
    [zoomFactor, canvasSize]
  );

  const updateTablePosition = (
    id: string,
    newX: number,
    newY: number,
    totalHeight: number
  ) => {
    setSchema(prevSchema => {
      return {
        ...prevSchema,
        tables: prevSchema.tables.map(table => {
          if (table.id === id) {
            return {
              ...table,
              x: Math.max(0, Math.min(newX, 1200 - 300)), // Ensure x is within limits
              y: Math.max(0, Math.min(newY, 800 - totalHeight)), // Ensure y is within limits
            };
          }
          return table;
        }),
      };
    });
  };

  const handleToggleCollapse = (tableId: string, fieldId: GUID) => {
    setSchema(currentSchema =>
      produce(currentSchema, draft => {
        const table = draft.tables.find(t => t.id === tableId);
        if (table) {
          const field = findField(table.fields, fieldId);
          if (field) {
            field.isCollapsed = !field.isCollapsed;
          }
        }
      })
    );
  };

  const findField = (fields: FieldVm[], id: string): FieldVm | undefined => {
    for (const field of fields) {
      if (field.id === id) return field;
      if (field.children) {
        const found = findField(field.children, id);
        if (found) return found;
      }
    }
    return undefined;
  };

  return (
    <div>
      <div className={classes.container}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={classes.containerSvg}
          viewBox={`0 0 ${viewBoxSize.width} ${viewBoxSize.height}`}
          width={canvasSize.width}
          height={canvasSize.height}
        >
          {schema.tables.map(table => (
            <DatabaseTable
              key={table.id}
              tableInfo={table}
              updatePosition={updateTablePosition}
              onToggleCollapse={handleToggleCollapse}
            />
          ))}
          );
        </svg>
      </div>
    </div>
  );
};
