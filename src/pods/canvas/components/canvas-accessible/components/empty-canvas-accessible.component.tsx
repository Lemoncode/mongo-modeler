import React from 'react';
import {
  DatabaseSchemaVm,
  TableVm,
  useCanvasSchemaContext,
  useCanvasViewSettingsContext,
  useModalDialogContext,
} from '@/core/providers';
import { EditTablePod } from '@/pods/edit-table';
import { ADD_COLLECTION_TITLE } from '@/common/components';

interface Props {
  canvasSchema: DatabaseSchemaVm;
}

const BORDER_MARGIN = 40;

export const EmptyCanvasAccessible: React.FC<Props> = props => {
  const { canvasSchema } = props;
  const { openModal, closeModal } = useModalDialogContext();
  const { addTable } = useCanvasSchemaContext();
  const { setLoadSample, scrollPosition } = useCanvasViewSettingsContext();

  const handleAddTable = (newTable: TableVm) => {
    const updatedTable = {
      ...newTable,
      x: scrollPosition.x + BORDER_MARGIN,
      y: scrollPosition.y + BORDER_MARGIN,
    };

    addTable(updatedTable);
    closeModal();
  };

  const handleEditTableClick = () => {
    setLoadSample(false);
    openModal(
      <EditTablePod
        relations={canvasSchema.relations}
        onSave={handleAddTable}
        onClose={handleCloseModal}
      />,
      ADD_COLLECTION_TITLE
    );
  };

  const handleCloseModal = () => {
    closeModal();
  };

  return (
    <>
      <h2>The canvas is empty</h2>
      <p>Create a collection to start working</p>
      <button onClick={handleEditTableClick}>Add Collection</button>
    </>
  );
};
