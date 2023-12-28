import React from 'react';
import { useCanvasViewSettingsContext } from '@/core/providers';
import classes from './toolbar.pod.module.css';
import { EditRelation } from '@/pods/edit-realtion';
import { EditTable } from '@/pods/edit-table';
import { useModalDialogContext } from '@/core/providers/modal-dialog-provider';

export const ToolbarPod: React.FC = () => {
  const { zoomIn, zoomOut } = useCanvasViewSettingsContext();
  const { openModal } = useModalDialogContext();
  const handleRelationClick = () => {
    openModal(<EditRelation />);
  };
  const handleEditTableClick = () => {
    openModal(<EditTable />);
  };

  return (
    <div className={classes.container}>
      <h1>Toolbar Pod</h1>
      <button onClick={zoomIn}>Zoom in</button>
      <button onClick={zoomOut}>Zoom out</button>
      <button onClick={handleRelationClick}>Relation</button>
      <button onClick={handleEditTableClick}>Edit Table</button>
    </div>
  );
};
