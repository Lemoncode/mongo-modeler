import React from 'react';
import classes from '../manage-index.module.css';
import { Reorder, motion, useDragControls } from 'framer-motion';
import { Commands } from './commands/commands.component';
import { DragDropIcon, Checkbox } from '@/common/components';
import { FieldVm } from '../manage-index.vm';
import { GUID } from '@/core/model';
import { Dropdown } from '@/common/components/dropdown/dropdown.component';

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
  fieldOptions: { id: string; label: string }[];
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
    fieldOptions,
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
        className={`${classes.fieldRow} `}
        initial="left"
        animate="stay"
        exit="left"
        variants={variantsItem}
        transition={{ duration: 0.3 }}
        dragListener={false}
        dragControls={dragControls}
      >
        <div className={classes.fieldCell}>
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
        <div className={classes.fieldCell}>
          <Dropdown
            name={`fields-${index.id}`}
            options={fieldOptions}
            value={
              index.fields?.map(field => {
                const option = fieldOptions.find(
                  opt => opt.label === field.name
                );
                return option?.id || ''; // Map the name back to the id for the dropdown
              }) || []
            }
            onChange={selectedFieldIds =>
              updateValue(
                index,
                'fields',
                selectedFieldIds.map(fieldId => {
                  const fieldOption = fieldOptions.find(
                    option => option.id === fieldId
                  );
                  if (!fieldOption) {
                    console.error(`Field option not found for id: ${fieldId}`);
                    return { name: '', orderMethod: 'Ascending' }; // Default to blank if not found
                  }
                  return {
                    name: fieldOption.label, // Map the id to the name (label)
                    orderMethod: 'Ascending', // Default order method
                  };
                })
              )
            }
            selectTitle="Select Table Fields"
            multiSelect={true}
          />
        </div>
        <div className={classes.fieldCell}>
          <Checkbox
            id="isUnique"
            checked={index.isUnique}
            onChange={() => updateValue(index, 'isUnique', !index.isUnique)}
            ariaLabel={CHECKBOX_ISUNIQUE + index.name}
          ></Checkbox>
        </div>
        <div className={classes.fieldCell}>
          <Checkbox
            id="sparse"
            checked={index.sparse}
            onChange={() => updateValue(index, 'sparse', !index.sparse)}
            ariaLabel={CHECKBOX_ISUNIQUE + index.name}
          ></Checkbox>
        </div>
        <div className={classes.fieldCell}>
          <input
            value={index.partialFilterExpression}
            onChange={e => {
              updateValue(index, 'partialFilterExpression', e.target.value);
            }}
            ref={el => assignRef(el, index.id)}
            aria-label={INPUT_NAME + index.name}
          />
        </div>
        <div className={`${classes.fieldCell} ${classes.commandsContainer}`}>
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
        <div className={classes.fieldCell}></div>
      </Reorder.Item>
    </React.Fragment>
  );
};
