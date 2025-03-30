import React from 'react';
import classes from '../manage-index.module.css';
import { GUID } from '@/core/model';
import { FieldVm } from '../manage-index.vm';

import { AnimatePresence, Reorder } from 'framer-motion';
import { Index } from './index';

interface NestedManageIndexGridProps {
  id?: GUID;
  indexes: FieldVm[];
  level: number;
  expanded: Set<string>;
  toggleExpand: (fieldId: string) => void;
  expand: (fieldId: string) => void;
  updateValue: <K extends keyof FieldVm>(
    index: FieldVm,
    id: K,
    value: FieldVm[K]
  ) => void;
  onDelete: (id: GUID) => void;
  onAdd: (id: GUID) => void;
  nameInputRefRecord: React.RefObject<Record<string, HTMLInputElement | null>>;
  onMoveDown: (id: GUID) => void;
  onMoveUp: (id: GUID) => void;
  onDrag?: (index: FieldVm[], id?: GUID) => void;
  isDeleteVisible: boolean;
  labelAddIndex?: string;
  fieldOptions: { id: string; label: string }[];
}

export const NestedManageIndexGrid: React.FC<NestedManageIndexGridProps> = ({
  id,
  indexes,
  level,
  expanded,
  toggleExpand,
  expand,
  updateValue,
  onDelete,
  onAdd,
  nameInputRefRecord,
  onMoveDown,
  onMoveUp,
  onDrag,
  isDeleteVisible,
  labelAddIndex,
  fieldOptions,
}) => {
  const variantsGroup = {
    open: { opacity: 1, height: 'auto' },
    collapsed: { opacity: 0, height: 0 },
  };
  return (
    <Reorder.Group
      values={indexes}
      onReorder={indexes => (onDrag ? onDrag(indexes, id) : null)}
      className={classes.nestedGrid}
      key={level}
      initial="collapsed"
      animate="open"
      exit="collapsed"
      variants={variantsGroup}
      transition={{ duration: 0.8 }}
    >
      <AnimatePresence initial={false}>
        {indexes.map(item => (
          <Index
            key={item.id}
            index={item}
            indexes={indexes}
            expand={expand}
            expanded={expanded}
            level={level}
            onAdd={onAdd}
            onDelete={onDelete}
            onMoveDown={onMoveDown}
            onMoveUp={onMoveUp}
            toggleExpand={toggleExpand}
            updateValue={updateValue}
            nameInputRefRecord={nameInputRefRecord}
            isDeleteVisible={isDeleteVisible}
            labelAddIndex={labelAddIndex}
            fieldOptions={fieldOptions}
          />
        ))}
      </AnimatePresence>
    </Reorder.Group>
  );
};
