import React from 'react';
import { useCanvasViewSettingsContext } from '@/core/providers';
import classes from './toolbar.pod.module.css';
import { EditRelation } from '@/pods/edit-realtion';
import { EditTablePod } from '@/pods/edit-table';
import { useModalDialogContext } from '@/core/providers/modal-dialog-provider';
import { CanvasSettingsComponent } from '../canvas-settings';
import { Size } from '@/core/model';
import {
  TableVm,
  useCanvasSchemaContext,
} from '@/core/providers/canvas-schema';

export const ToolbarPod: React.FC = () => {
  const { canvasSchema, addTable } = useCanvasSchemaContext();
  const { zoomIn, zoomOut, canvasViewSettings, setCanvasSize } =
    useCanvasViewSettingsContext();
  const { openModal, closeModal } = useModalDialogContext();

  const handleRelationClick = () => {
    openModal(<EditRelation />);
  };

  const handleAddTable = (newTable: TableVm) => {
    // TODO: Calculate X,Y position based on canvas current view port, maybe we have
    // to keep this info in the settings or new context, then update newTable object X,Y position
    // #62
    // https://github.com/Lemoncode/mongo-modeler/issues/62
    addTable(newTable);
    closeModal();
  };

  const handleEditTableClick = () => {
    openModal(
      <EditTablePod
        relations={canvasSchema.relations}
        onSave={handleAddTable}
      />,
      true
    );
  };

  const handleChangeSettings = (size: Size) => {
    setCanvasSize(size);
    closeModal();
  };

  const handleCanvasSettings = () => {
    openModal(
      <CanvasSettingsComponent
        size={canvasViewSettings.canvasSize}
        onChangeSize={handleChangeSettings}
      />
    );
  };

  return (
    <div className={classes.container}>
      <button onClick={zoomIn}>Zoom in</button>
      <button onClick={zoomOut}>Zoom out</button>
      <button onClick={handleRelationClick}>Relation</button>
      <button onClick={handleEditTableClick}>Edit Table</button>
      <button onClick={handleCanvasSettings}>Canvas Settings</button>
    </div>
  );
};
