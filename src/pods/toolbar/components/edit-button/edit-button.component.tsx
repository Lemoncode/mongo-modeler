import { useModalDialogContext } from '@/core/providers/modal-dialog-provider';
import { EditTablePod } from '@/pods/edit-table';
import { ToolbarButton } from '../toolbar-button/toolbarButton.component';
import { Edit } from '@/common/components/icons';
import { useCanvasViewSettingsContext } from '@/core/providers';
import classes from '@/pods/toolbar/toolbar.pod.module.css';
import {
  TableVm,
  useCanvasSchemaContext,
} from '@/core/providers/canvas-schema';
import { EDIT_TABLE_TITLE } from '@/common/components/modal-dialog';

export const EditButton = () => {
  const { openModal, closeModal } = useModalDialogContext();
  const { canvasSchema, addTable } = useCanvasSchemaContext();
  const { scrollPosition } = useCanvasViewSettingsContext();

  const handleAddTable = (newTable: TableVm) => {
    const ADD_TABLE_MARGIN = 15;
    const updatedTable = {
      ...newTable,
      x: scrollPosition.x + ADD_TABLE_MARGIN,
      y: scrollPosition.y + ADD_TABLE_MARGIN,
    };

    addTable(updatedTable);
    closeModal();
  };
  const handleEditTableClick = () => {
    openModal(
      <EditTablePod
        relations={canvasSchema.relations}
        onSave={handleAddTable}
      />,
      EDIT_TABLE_TITLE
    );
  };
  return (
    <ToolbarButton
      icon={<Edit />}
      label="Add Table"
      onClick={handleEditTableClick}
      className={classes.button}
    />
  );
};
