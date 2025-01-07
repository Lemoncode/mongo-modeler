import React, { useState } from 'react';
import classes from './manage-index.module.css';
import { createDefaultIndex, FieldVm } from './manage-index.vm';
import { GUID } from '@/core/model';
import { useInputRefFocus } from './use-input-focus.hook';
import { TableVm } from '@/core/providers';
import { NestedManageIndexGrid } from './components/nested-manage-index-grid';

interface Props {
  table: TableVm;
  updateValue: <K extends keyof FieldVm>(
    field: FieldVm,
    id: K,
    value: FieldVm[K]
  ) => void;
  onDelete: (id: GUID) => void;
  onAdd: (id: GUID, newIndexId: GUID) => void;
  onMoveDown: (id: GUID) => void;
  onMoveUp: (id: GUID) => void;
  onDrag?: (index: FieldVm[], id?: GUID) => void;
}

export const ManageIndexComponent: React.FC<Props> = props => {
  const { table, updateValue, onDelete, onAdd, onMoveDown, onMoveUp, onDrag } =
    props;

  const { handleAdd, nameInputRefRecord } = useInputRefFocus(onAdd);

  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const expand = (indexId: GUID) => {
    setExpanded(prev => {
      const newExpanded = new Set(prev);
      if (!newExpanded.has(indexId)) {
        newExpanded.add(indexId);
      }
      return newExpanded;
    });
  };

  const toggleExpand = (indexId: GUID) => {
    setExpanded(prev => {
      const newExpanded = new Set(prev);
      if (newExpanded.has(indexId)) {
        newExpanded.delete(indexId);
      } else {
        newExpanded.add(indexId);
      }
      return newExpanded;
    });
  };

  return (
    <>
      <div className={classes.tableName}>
        <label>Collection: {table.tableName}</label>
      </div>

      <div className={classes.tableName}>
        Instructions:
        <li>
          Please note that the Fields column should be provided as the
          following. FieldName1 (Ascending/Descending: optional), FieldName2
          (Ascending/Descending: optional). The comma separator is needed if
          more than one field is needed
        </li>
      </div>

      <div className={classes.tableEditor}>
        <div className={classes.headerRow}>
          <div className={classes.headerCell}>Name</div>
          <div className={classes.headerCell}>Unique</div>
          <div className={classes.headerCell}>Fields</div>
          <div className={classes.headerCell}>Actions</div>
        </div>

        <NestedManageIndexGrid
          indexes={(table.indexes as FieldVm[]) ?? [createDefaultIndex()]}
          level={0}
          expanded={expanded}
          toggleExpand={toggleExpand}
          expand={expand}
          updateValue={updateValue}
          onDelete={onDelete}
          onAdd={handleAdd}
          onMoveDown={onMoveDown}
          onMoveUp={onMoveUp}
          onDrag={onDrag}
          nameInputRefRecord={nameInputRefRecord}
          isDeleteVisible={table.fields?.length !== 1}
        />
      </div>
    </>
  );
};
