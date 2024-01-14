import { useModalDialogContext } from '@/core/providers/modal-dialog-provider';
import { EditTablePod } from '@/pods/edit-table';
import { ToolbarButton } from '../toolbar-button/toolbarButton.component';
import { Edit } from '@/common/components/icons';
import classes from '@/pods/toolbar/toolbar.pod.module.css';
import {
  TableVm,
  useCanvasSchemaContext,
} from '@/core/providers/canvas-schema';
import { EDIT_TABLE_TITLE } from '@/common/components/modal-dialog';
import React from 'react';
import * as editTableVm from '@/pods/edit-table/edit-table.vm';

export const EditButton = () => {
  const { openModal, closeModal } = useModalDialogContext();
  const { addTable } = useCanvasSchemaContext();
  const handleAddTable = (newTable: TableVm) => {
    // TODO: Calculate X,Y position based on canvas current view port, maybe we have
    // to keep this info in the settings or new context, then update newTable object X,Y position
    // #62
    // https://github.com/Lemoncode/mongo-modeler/issues/62
    console.log(newTable);
    addTable(newTable);
    closeModal();
  };
  const [editTable, setEditTable] = React.useState<editTableVm.TableVm>(
    editTableVm.createDefaultTable()
  );

  const handleUpdateTableName = (value: string) => {
    console.log(value);
    setEditTable({ ...editTable, tableName: value });
  };

  const handleEditTableClick = () => {
    openModal(
      <EditTablePod
        onSave={handleAddTable}
        editTable={editTable}
        setEditTable={setEditTable}
      />,
      EDIT_TABLE_TITLE,
      'New Table',
      handleUpdateTableName
    );
  };
  return (
    <ToolbarButton
      icon={<Edit />}
      label="Add Table"
      onClick={handleEditTableClick}
      className={classes.button}
    />
  );
};
