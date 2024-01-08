import React from 'react';
import {
  useCanvasViewSettingsContext,
  useModalDialogContext,
} from '@/core/providers';
import { GUID, Size } from '@/core/model';
import { mockSchema } from './canvas.mock.data';
import { DatabaseTable } from './components/table/database-table.component';
import classes from './canvas.pod.module.css';
import { DatabaseRelationCollectionComponent } from './components/relation';
import {
  TableVm,
  useCanvasSchemaContext,
} from '@/core/providers/canvas-schema';
import { EditTablePod } from '../edit-table';

export const CanvasPod: React.FC = () => {
  const { openModal, closeModal } = useModalDialogContext();

  const {
    canvasSchema,
    loadSchema,
    updateTablePosition,
    doFieldToggleCollapse,
    updateFullTable,
  } = useCanvasSchemaContext();
  const { canvasViewSettings } = useCanvasViewSettingsContext();
  const { canvasSize, zoomFactor } = canvasViewSettings;

  // TODO: This is temporary code, once we get load and save
  // we won't need to load this mock data
  React.useEffect(() => {
    loadSchema(mockSchema);
  }, []);

  const viewBoxSize: Size = React.useMemo<Size>(
    () => ({
      width: canvasSize.width * zoomFactor,
      height: canvasSize.height * zoomFactor,
    }),
    [zoomFactor, canvasSize]
  );

  const handleToggleCollapse = (tableId: string, fieldId: GUID) => {
    doFieldToggleCollapse(tableId, fieldId);
  };

  const handleTableEditUpdate = (table: TableVm) => {
    updateFullTable(table);
    closeModal();
  };

  const handleEditTable = (tableInfo: TableVm) => {
    openModal(
      <EditTablePod
        table={tableInfo}
        relations={canvasSchema.relations}
        onSave={handleTableEditUpdate}
      />
    );
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
          {canvasSchema.tables.map(table => (
            <DatabaseTable
              key={table.id}
              tableInfo={table}
              updatePosition={updateTablePosition}
              onToggleCollapse={handleToggleCollapse}
              onEditTable={handleEditTable}
            />
          ))}
          <DatabaseRelationCollectionComponent schema={canvasSchema} />
        </svg>
      </div>
    </div>
  );
};
