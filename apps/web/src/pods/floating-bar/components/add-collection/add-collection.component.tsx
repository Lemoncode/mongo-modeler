import { useModalDialogContext } from '@/core/providers/modal-dialog-provider';
import { EditTablePod } from '@/pods/edit-table';
import { TableIcon } from '@/common/components/icons';
import { useCanvasViewSettingsContext } from '@/core/providers';

import {
  TableVm,
  useCanvasSchemaContext,
} from '@/core/providers/canvas-schema';
import { ADD_COLLECTION_TITLE } from '@/common/components/modal-dialog';
import { ActionButton } from '@/common/components/action-button';
import { SHORTCUTS } from '@/common/shortcut';
import classes from '../floating-bar-components.module.css';

const BORDER_MARGIN = 40;

export const AddCollection = () => {
  const { openModal, closeModal } = useModalDialogContext();
  const { canvasSchema, addTable } = useCanvasSchemaContext();
  const { canvasViewSettings, setLoadSample } = useCanvasViewSettingsContext();

  const handleAddTable = (newTable: TableVm) => {
    const updatedTable = {
      ...newTable,
      x: canvasViewSettings.scrollPosition.x + BORDER_MARGIN,
      y: canvasViewSettings.scrollPosition.y + BORDER_MARGIN,
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
    <ActionButton
      icon={<TableIcon />}
      label="Add Collection"
      onClick={handleEditTableClick}
      className={`${classes.button} hide-mobile add-collection-button`}
      shortcutOptions={SHORTCUTS.addCollection}
      showLabel={false}
      tooltipPosition="top"
    />
  );
};
