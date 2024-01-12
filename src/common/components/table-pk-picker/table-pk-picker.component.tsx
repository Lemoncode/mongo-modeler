import React from 'react';
import classes from './table-pk-picker.component.module.css';
import { FieldTree } from './components/field-tree.component';
import { ExpandDown } from '../icons/expand-down-icon.component';
import { OptionVm } from './table-pk-picker.model';
import { GUID } from '@/core/model';

interface Props {
  name: string;
  options: OptionVm[];
  label?: string;
  selectedKeyFieldId?: GUID;
  selectTitle?: string;
  onKeySelected: (field: OptionVm) => void;
}

export const TablePkPicker: React.FC<Props> = props => {
  const {
    name,
    label,
    options,
    onKeySelected,
    selectTitle,
    selectedKeyFieldId,
  } = props;

  const [selectedPath, setSelectedPath] = React.useState('');
  const [optionsListVisible, setOptionsListVisible] = React.useState(false);
  const [currentSelectedKeyFieldId, setCurrentSelectedKeyFieldId] =
    React.useState(selectedKeyFieldId);

  const handleOptionClick = (option: OptionVm, parentPath: string) => {
    setCurrentSelectedKeyFieldId(option.id);
    const currentPath = parentPath
      ? `${parentPath} > ${option.label}`
      : option.label;
    setSelectedPath(currentPath);
    setOptionsListVisible(false);
    onKeySelected(option);
  };

  return (
    <>
      <div className={classes.select}>
        <p className={classes.selectLabel}>{label ? label : ''}</p>
        <div className={classes.selectSelect}>
          <div
            className={classes.selectChosen}
            onClick={() => setOptionsListVisible(!optionsListVisible)}
          >
            <p className={classes.selectText}>
              {selectedPath || selectTitle || 'Selecciona una opción'}
            </p>
            <ExpandDown />
          </div>
          <FieldTree
            name={name}
            options={options}
            optionsListVisible={optionsListVisible}
            handleOptionClick={handleOptionClick}
            selectedPKField={currentSelectedKeyFieldId}
          />
        </div>
      </div>
      {optionsListVisible && (
        <div
          className={classes.veil}
          onClick={() => setOptionsListVisible(!optionsListVisible)}
        ></div>
      )}
    </>
  );
};
