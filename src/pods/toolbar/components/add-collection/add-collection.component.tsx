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

export const AddCollection = () => {
  const { openModal, closeModal } = useModalDialogContext();
  const { canvasSchema, addTable } = useCanvasSchemaContext();
  const { canvasViewSettings, setLoadSample } = useCanvasViewSettingsContext();
  const { canvasSize, zoomFactor, viewBoxSize } = canvasViewSettings;

  const handleAddTable = (newTable: TableVm) => {
    if (!newTable) {
      return;
    }

    const tableSize = setOffSetZoomToCoords(
      getTableSize(newTable.fields).width,
      getTableSize(newTable.fields).height,
      viewBoxSize,
      canvasSize,
      zoomFactor
    );

    const getTableSizeOffSetDependingAtZoom = () => {
      return {
        width: tableSize.x / getTableSize(newTable.fields).width,
        height: tableSize.y / getTableSize(newTable.fields).height,
      };
    };

    const position = findFreePositionOrMinCollision(
      mapTableVMtoBoxVMMapper(canvasSchema.tables),
      {
        width:
          getTableSize(newTable.fields).width /
          getTableSizeOffSetDependingAtZoom().width,
        height:
          getTableSize(newTable.fields).height /
          getTableSizeOffSetDependingAtZoom().height,
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
      x: position.x - getTableSize(newTable.fields).width / 2,
      y: position.y - getTableSize(newTable.fields).height / 2,
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
