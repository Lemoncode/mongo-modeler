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
  const {
    setLoadSample,
    scrollPosition,
    canvasViewSettings,
    viewBoxSize,
    CANVAS_MAX_HEIGHT,
    CANVAS_MAX_WIDTH,
  } = useCanvasViewSettingsContext();

  const getZoomAdjustmentAccordingToScroll = (
    zoomFactor: number
  ): { zoomOffsetX: number; zoomOffsetY: number } => {
    let offsetX = 0;
    let offsetY = 0;
    const MULTIPLIER_TO_SET_OFFSET_TO_CANVAS_DIMENSION_WIDTH =
      CANVAS_MAX_WIDTH / canvasViewSettings.canvasSize.width;
    const MULTIPLIER_TO_SET_OFFSET_TO_CANVAS_DIMENSION_HEIGHT =
      CANVAS_MAX_WIDTH / canvasViewSettings.canvasSize.height;
    const adjustedWidth = CANVAS_MAX_WIDTH / viewBoxSize.width;
    const adjustedHeight = CANVAS_MAX_HEIGHT / viewBoxSize.height;

    const marginLeft =
      (40 / (zoomFactor * adjustedWidth) / adjustedWidth) *
      MULTIPLIER_TO_SET_OFFSET_TO_CANVAS_DIMENSION_WIDTH;
    const marginTop =
      (40 / (zoomFactor * adjustedWidth) / adjustedHeight) *
      MULTIPLIER_TO_SET_OFFSET_TO_CANVAS_DIMENSION_WIDTH;

    if (scrollPosition) {
      offsetX =
        (scrollPosition.x / (zoomFactor * adjustedWidth) / adjustedWidth) *
          MULTIPLIER_TO_SET_OFFSET_TO_CANVAS_DIMENSION_WIDTH +
        marginLeft;
      offsetY =
        (scrollPosition.y / (zoomFactor * adjustedHeight) / adjustedHeight) *
          MULTIPLIER_TO_SET_OFFSET_TO_CANVAS_DIMENSION_HEIGHT +
        marginTop;
    }

    return { zoomOffsetX: offsetX, zoomOffsetY: offsetY };
  };
  const handleAddTable = (newTable: TableVm) => {
    const { zoomOffsetX, zoomOffsetY } = getZoomAdjustmentAccordingToScroll(
      canvasViewSettings.zoomFactor
    );

    const updatedTable = {
      ...newTable,
      x: zoomOffsetX,
      y: zoomOffsetY,
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
