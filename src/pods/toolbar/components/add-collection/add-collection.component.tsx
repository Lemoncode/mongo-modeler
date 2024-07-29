import { useModalDialogContext } from '@/core/providers/modal-dialog-provider';
import { EditTablePod } from '@/pods/edit-table';
import { ToolbarButton } from '../toolbar-button/toolbarButton.component';
import { TableIcon } from '@/common/components/icons';
import { useCanvasViewSettingsContext } from '@/core/providers';
import classes from '@/pods/toolbar/toolbar.pod.module.css';
import {
  TableVm,
  useCanvasSchemaContext,
} from '@/core/providers/canvas-schema';
import { ADD_COLLECTION_TITLE } from '@/common/components/modal-dialog';
import { SHORTCUTS } from '../../shortcut/shortcut.const';
import { findFreePositionOrMinCollision } from '@/common/autoarrange-table';
import { getTableSize } from './add-collection.helper';
import { mapTableVMtoBoxVMMapper } from './add-collection.mapper';

export const AddCollection = () => {
  const { openModal, closeModal } = useModalDialogContext();
  const { canvasSchema, addTable } = useCanvasSchemaContext();
  const { canvasViewSettings, setLoadSample } = useCanvasViewSettingsContext();

  const handleAddTable = (newTable: TableVm) => {
    if (!newTable) {
      return;
    }

    const position = findFreePositionOrMinCollision(
      mapTableVMtoBoxVMMapper(canvasSchema.tables),
      {
        width: getTableSize(newTable.fields).width,
        height: getTableSize(newTable.fields).height,
      },
      {
        width: canvasViewSettings.canvasViewSize.width,
        height: canvasViewSettings.canvasViewSize.height,
      }
    );

    if (!position) {
      return;
    }

    const updatedTable: TableVm = {
      ...newTable,
      x: position.x,
      y: position.y,
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
    <ToolbarButton
      icon={<TableIcon />}
      label="Add Collection"
      onClick={handleEditTableClick}
      className={`${classes.button} hide-mobile`}
      shortcutOptions={SHORTCUTS.addCollection}
    />
  );
};
