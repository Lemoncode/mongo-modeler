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
import { setOffSetZoomToCoords } from '@/common/helpers/set-off-set-zoom-to-coords.helper';
import { getTableSize } from './add-collection.helper';
import { mapTableVMtoBoxVMMapper } from './add-collection.mapper';

const TABLE_GAP = 40;

export const AddCollection = () => {
  const { openModal, closeModal } = useModalDialogContext();
  const { canvasSchema, addTable } = useCanvasSchemaContext();
  const { canvasViewSettings, setLoadSample } = useCanvasViewSettingsContext();
  const { canvasSize, zoomFactor, viewBoxSize } = canvasViewSettings;

  const handleAddTable = (newTable: TableVm) => {
    if (!newTable) {
      return;
    }

    // Applying a zoom offSet to the table size,
    // so that when zoomed the size of the tables is updated

    const tableSizeWithZoomOffSet = setOffSetZoomToCoords(
      getTableSize(newTable.fields).width + TABLE_GAP,
      getTableSize(newTable.fields).height + TABLE_GAP,
      viewBoxSize,
      canvasSize,
      zoomFactor
    );

    // Obtaining free position or with minimum collision for the new table

    const position = findFreePositionOrMinCollision(
      mapTableVMtoBoxVMMapper(canvasSchema.tables),
      {
        width: tableSizeWithZoomOffSet.x,
        height: tableSizeWithZoomOffSet.y,
      },
      {
        width: canvasViewSettings.canvasViewSize.width,
        height: canvasViewSettings.canvasViewSize.height,
      }
    );

    if (!position) {
      return;
    }

    // Adding zoom offset to position coords and
    // subtracting the size of the board by two
    // to place the board from the middle

    const positionWithZoomOffSet = setOffSetZoomToCoords(
      position.x - getTableSize(newTable.fields).width / 2,
      position.y - getTableSize(newTable.fields).height / 2,
      viewBoxSize,
      canvasSize,
      zoomFactor
    );

    const updatedTable: TableVm = {
      ...newTable,
      x: positionWithZoomOffSet.x,
      y: positionWithZoomOffSet.y,
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
