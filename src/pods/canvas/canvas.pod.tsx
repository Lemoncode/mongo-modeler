import React from "react";
import { produce } from "immer";
import { mockSchema } from "./canvas.mock.data";
import classes from "./canvas.pod.module.css";
import { FieldVm, GUID } from "./canvas.vm";
import { DatabaseTable } from "./components/table/database-table.component";

interface Size {
  width: number;
  height: number;
}

export const CanvasPod: React.FC = () => {
  const [schema, setSchema] = React.useState(() => mockSchema);
  const [zoomFactor, setZoomFactor] = React.useState(1);
  const [size] = React.useState<Size>({ width: 2400, height: 2400 });

  const viewBoxSize: Size = React.useMemo<Size>(
    () => ({
      width: size.width * zoomFactor,
      height: size.height * zoomFactor,
    }),
    [zoomFactor, size]
  );

  const updateTablePosition = (
    id: string,
    newX: number,
    newY: number,
    totalHeight: number
  ) => {
    setSchema((prevSchema) => {
      return {
        ...prevSchema,
        tables: prevSchema.tables.map((table) => {
          if (table.id === id) {
            return {
              ...table,
              x: Math.max(0, Math.min(newX, 1200 - 300)), // Asegurar que x está dentro de los límites
              y: Math.max(0, Math.min(newY, 800 - totalHeight)), // Asegurar que y está dentro de los límites
            };
          }
          return table;
        }),
      };
    });
  };

  const handleToggleCollapse = (tableId: string, fieldId: GUID) => {
    setSchema((currentSchema) =>
      produce(currentSchema, (draft) => {
        const table = draft.tables.find((t) => t.id === tableId);
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
      <button onClick={() => setZoomFactor((zoomFactor) => zoomFactor * 0.9)}>
        Zoom in
      </button>
      <button onClick={() => setZoomFactor((zoomFactor) => zoomFactor * 1.1)}>
        Zoom out
      </button>
      <div className={classes.container}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={classes.containerSvg}
          viewBox={`0 0 ${viewBoxSize.width} ${viewBoxSize.height}`} // Zoom play
          width={size.width} // Explicit SVG canvas width TODO: configure
          height={size.height} // Explicit SVG canvas height TODO: configure
        >
          {schema.tables.map((table) => (
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
