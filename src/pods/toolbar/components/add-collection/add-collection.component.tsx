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
import { useOffsetZoomToCoords } from './set-off-set-zoom-to-coords.hook';

const BORDER_MARGIN = 40;

export const AddCollection = () => {
  const { openModal, closeModal } = useModalDialogContext();
  const { canvasSchema, addTable } = useCanvasSchemaContext();
  const { setLoadSample, scrollPosition } = useCanvasViewSettingsContext();

  const { x: scrollOffsetX, y: scrollOffsetY } = useOffsetZoomToCoords({
    x: scrollPosition.x + BORDER_MARGIN,
    y: scrollPosition.y + BORDER_MARGIN,
  });

  const handleAddTable = (newTable: TableVm) => {
    const updatedTable = {
      ...newTable,
      x: scrollOffsetX,
      y: scrollOffsetY,
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
