import { useModalDialogContext } from '@/core/providers/modal-dialog-provider';
import { EditTablePod } from '@/pods/edit-table';
import { ToolbarButton } from '../toolbar-button/toolbarButton.component';
import { Edit } from '@/common/components/icons';
import classes from '@/pods/toolbar/toolbar.pod.module.css';
import {
  TableVm,
  useCanvasSchemaContext,
} from '@/core/providers/canvas-schema';

export const EditButton = () => {
  const { openModal, closeModal } = useModalDialogContext();
  const { canvasSchema, addTable } = useCanvasSchemaContext();
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
      />
    );
  };
  return (
    <ToolbarButton
      icon={<Edit />}
      label="Edit"
      onClick={handleEditTableClick}
      className={classes.button}
    />
  );
};
