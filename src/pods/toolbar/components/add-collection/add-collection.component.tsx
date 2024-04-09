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

export const AddCollection = () => {
  const { openModal, closeModal } = useModalDialogContext();
  const { canvasSchema, addTable } = useCanvasSchemaContext();
  const { setLoadSample, scrollPosition } = useCanvasViewSettingsContext();
  const BORDER_MARGIN = 40;

  const { x: zoomOffsetX, y: zoomOffsetY } = useOffsetZoomToCoords({
    x: BORDER_MARGIN,
    y: BORDER_MARGIN,
  });

  const { x: scrollOffsetX, y: scrollOffsetY } = useOffsetZoomToCoords({
    x: scrollPosition.x,
    y: scrollPosition.y,
  });

  const getOffSetAccordingToScrollAndZoom = (): {
    offsetX: number;
    offsetY: number;
  } => {
    const offsetX = scrollOffsetX + zoomOffsetX;
    const offsetY = scrollOffsetY + zoomOffsetY;

    return { offsetX, offsetY };
  };
  const handleAddTable = (newTable: TableVm) => {
    const { offsetX, offsetY } = getOffSetAccordingToScrollAndZoom();

    const updatedTable = {
      ...newTable,
      x: offsetX,
      y: offsetY,
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
