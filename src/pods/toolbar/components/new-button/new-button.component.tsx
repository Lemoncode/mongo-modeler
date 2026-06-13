import { NewIcon } from '@/common/components/icons/new-icon.component';
import {
  useCanvasSchemaContext,
  useCanvasViewSettingsContext,
} from '@/core/providers';
import { ActionButton } from '@/common/components/action-button';
import { SHORTCUTS } from '@/common/shortcut';
import { useModalDialogContext } from '@/core/providers';
import { NEW_MODEL_CONFIRMATION_TITLE } from '@/common/components';
import { NewModelDialog } from './new-model-dialog.component';

export const NewButton = () => {
  const { canvasSchema, createEmptySchema } = useCanvasSchemaContext();
  const { setFilename, setLoadSample } = useCanvasViewSettingsContext();
  const { openModal, closeModal } = useModalDialogContext();

  const doCreateNew = () => {
    setFilename('');
    createEmptySchema();
    setLoadSample(false);
    closeModal();
  };

  const handleNewButtonClick = () => {
    if (!canvasSchema.isPristine) {
      openModal(
        <NewModelDialog onConfirm={doCreateNew} onCancel={closeModal}/>,
        NEW_MODEL_CONFIRMATION_TITLE,
        true
      )
    } else {
      doCreateNew();
    }
  }

  return (
    <ActionButton
      icon={<NewIcon />}
      label="New"
      onClick={handleNewButtonClick}
      className="hide-mobile"
      shortcutOptions={SHORTCUTS.new}
    />
  );
};
