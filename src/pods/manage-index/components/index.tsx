import React from 'react';
import classes from '../manage-index.module.css';
import { Reorder, motion, useDragControls } from 'framer-motion';
import { Commands } from './commands/commands.component';
import { DragDropIcon, Checkbox } from '@/common/components';
import { FieldVm } from '../manage-index.vm';
import { GUID } from '@/core/model';

interface Props {
  index: FieldVm;
  indexes: FieldVm[];
  level: number;
  expanded: Set<string>;
  toggleExpand: (id: GUID) => void;
  expand: (id: GUID) => void;
  updateValue: <K extends keyof FieldVm>(
    index: FieldVm,
    id: K,
    value: FieldVm[K]
  ) => void;
  nameInputRefRecord: React.RefObject<Record<string, HTMLInputElement | null>>;
  onDelete: (id: GUID) => void;
  onAdd: (id: GUID) => void;
  onMoveDown: (id: GUID) => void;
  onMoveUp: (id: GUID) => void;
  isDeleteVisible: boolean;
  labelAddIndex?: string;
}

const INPUT_NAME = 'Index ';
const CHECKBOX_ISUNIQUE = 'Checkbox isUnique for index ';
export const Index: React.FC<Props> = props => {
  const {
    index,
    indexes,
    level,
    onAdd,
    onDelete,
    onMoveDown,
    onMoveUp,
    updateValue,
    nameInputRefRecord,
    isDeleteVisible,
    labelAddIndex,
  } = props;
  const variantsItem = {
    left: {
      opacity: 0,
      x: -200,
      scale: 0.8,
    },
    stay: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.3 },
    },
  };
  const dragControls = useDragControls();
  const handleAdd = (id: GUID) => {
    onAdd(id);
  };

  const handlerPointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    dragControls.start(e);
    e.currentTarget.style.cursor = 'grabbing';
  };

  const assignRef = (el: HTMLInputElement | null, id: string) => {
    if (el && nameInputRefRecord?.current) {
      nameInputRefRecord.current[id] = el;
    }
  };

  return (
    <React.Fragment key={index.id}>
      <Reorder.Item
        value={index}
        key={index.id}
        style={{ y: 0 }}
        className={`${classes.indexRow} `}
        initial="left"
        animate="stay"
        exit="left"
        variants={variantsItem}
        transition={{ duration: 0.3 }}
        dragListener={false}
        dragControls={dragControls}
      >
        <div className={classes.indexCell}>
          <motion.button
            className={classes.dragButton}
            onPointerDown={e => handlerPointerDown(e)}
            onPointerUp={e => (e.currentTarget.style.cursor = 'grab')}
            aria-hidden="true"
            tabIndex={-1}
          >
            <DragDropIcon />
          </motion.button>
          <div className={`${classes.expandCell} ${classes[`indent${level}`]}`}>
            <div className={classes.buttonSpace} />
            <div className={classes.inputName}>
              <input
                value={index.name}
                onChange={e => {
                  updateValue(index, 'name', e.target.value);
                }}
                ref={el => assignRef(el, index.id)}
                aria-label={INPUT_NAME + index.name}
              />
            </div>
          </div>
        </div>
        <div className={classes.indexCell}>
          <Checkbox
            id="isUnique"
            checked={index.isUnique}
            onChange={() => updateValue(index, 'isUnique', !index.isUnique)}
            ariaLabel={CHECKBOX_ISUNIQUE + index.name}
          ></Checkbox>
        </div>
        <div className={classes.inputName}>
          <input
            value={index.fieldsString}
            onChange={e => {
              updateValue(index, 'fieldsString', e.target.value);
            }}
            ref={el => assignRef(el, index.id)}
            aria-label={INPUT_NAME + index.name}
          />
        </div>
        <div className={`${classes.indexCell} ${classes.commandsContainer}`}>
          <Commands
            index={index}
            indexes={indexes}
            onDeleteIndex={onDelete}
            onAddIndex={handleAdd}
            onMoveDown={onMoveDown}
            onMoveUp={onMoveUp}
            isDeleteVisible={isDeleteVisible}
            labelAddIndex={labelAddIndex}
          />
        </div>
      </Reorder.Item>
    </React.Fragment>
  );
};
