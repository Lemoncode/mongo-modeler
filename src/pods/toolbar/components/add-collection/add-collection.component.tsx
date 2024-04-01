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

export const AddCollection = () => {
  const { openModal, closeModal } = useModalDialogContext();
  const { canvasSchema, addTable } = useCanvasSchemaContext();
  const { setLoadSample, canvasViewSettings, canvasContainerRef, viewBoxSize } =
    useCanvasViewSettingsContext();
  const { zoomFactor } = canvasViewSettings;

  const getCanvasTopLeftCorner = (
    containerRef: React.RefObject<HTMLDivElement>,
    zoomFactor: number
  ): { x: number; y: number } => {
    let offsetX = 0;
    let offsetY = 0;
    const viewBoxWidth = 21000;
    const viewBoxHeight = 21000;
    const adjustedWidth = viewBoxWidth / viewBoxSize.width;
    const adjustedHeight = viewBoxHeight / viewBoxSize.height;

    if (containerRef.current) {
      offsetX = Math.round(
        containerRef.current.scrollLeft / (zoomFactor * adjustedWidth)
      );
      offsetY = Math.round(
        containerRef.current.scrollTop / (zoomFactor * adjustedHeight)
      );
    }

    return { x: offsetX, y: offsetY };
  };

  const handleAddTable = (newTable: TableVm) => {
    const ADD_TABLE_MARGIN = 4.45;

    const { x, y } = getCanvasTopLeftCorner(canvasContainerRef, zoomFactor);
    console.log('Top left corner coordinates:', x, y);

    const viewBoxWidth = 21000;
    const viewBoxHeight = 21000;
    const adjustedWidth = viewBoxWidth / viewBoxSize.width;
    const adjustedHeight = viewBoxHeight / viewBoxSize.height;

    const adjustedX = (x * ADD_TABLE_MARGIN) / adjustedWidth;
    const adjustedY = (y * ADD_TABLE_MARGIN) / adjustedHeight;

    const updatedTable = {
      ...newTable,
      x: adjustedX,
      y: adjustedY,
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
