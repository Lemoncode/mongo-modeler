import { useModalDialogContext } from '@/core/providers/modal-dialog-provider';
import { ToolbarButton } from '@/pods/toolbar/components/toolbar-button';
import classes from '@/pods/toolbar/toolbar.pod.module.css';
import {
  IndexVm,
  useCanvasSchemaContext,
} from '@/core/providers/canvas-schema';
import { MANAGE_INDEX_TITLE } from './../../../../common/components/modal-dialog/modal-dialog.const';

export const ManageIndexButton = () => {
  const { openModal, closeModal } = useModalDialogContext();
  const { canvasSchema, addIndexes } = useCanvasSchemaContext();

  const handleChangeCanvasSchema = (indexes: IndexVm[]) => {
    addIndexes('tableId', indexes);
    closeModal();
  };
  // const handleClose = () => {
  //   closeModal();
  // };

  const handleClick = () => {
    openModal('Test1', MANAGE_INDEX_TITLE);
    handleChangeCanvasSchema([
      {
        id: '',
        name: 'test',
        isUnique: false,
        fields: [],
      },
    ]);
  };

  return (
    <ToolbarButton
      label="Manage Index"
      onClick={handleClick}
      className={`${classes.button} hide-mobile`}
      //shortcutOptions={SHORTCUTS.addRelation}
      disabled={canvasSchema.tables.length < 1}
    />
  );
};
