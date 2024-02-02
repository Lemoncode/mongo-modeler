import React from 'react';
import classes from './table-pk-picker.component.module.css';
import { FieldTree } from './components/field-tree.component';
import { ExpandDown } from '../icons/expand-down-icon.component';
import { PkOptionVm } from './table-pk-picker.model';
import { SELECT_AN_PK_OPTION } from './table-pk-picker.const';
import { generateLabel } from './table-pk-picker.business';

interface Props {
  name: string;
  options: PkOptionVm[];
  value?: PkOptionVm;
  onChange: (field: PkOptionVm) => void;
  selectTitle?: string;
  isError?: boolean;
  disabled?: boolean;
}

export const TablePkPicker: React.FC<Props> = props => {
  const { name, options, selectTitle, value, onChange, disabled, isError } =
    props;

  const path = value?.label && generateLabel(options, value.id, []);
  const [selectedPath, setSelectedPath] = React.useState(path);

  const [optionsListVisible, setOptionsListVisible] = React.useState(false);
  const [currentSelectedKeyFieldId, setCurrentSelectedKeyFieldId] =
    React.useState(value?.id);

  const handleOptionClick = (option: PkOptionVm, parentPath: string) => {
    setCurrentSelectedKeyFieldId(option.id);
    const currentPath = parentPath
      ? `${parentPath} > ${option.label}`
      : option.label;
    setSelectedPath(currentPath);
    setOptionsListVisible(false);
    onChange(option);
  };

  React.useEffect(() => {
    if (!value?.label) setSelectedPath('');
  }, [value]);

  return (
    <>
      <div
        className={`${classes.selectSelect} ${
          isError && !disabled && classes.selectError
        } ${disabled && classes.selectDisabled} ${optionsListVisible && classes.selectActive}`}
      >
        <div
          className={classes.selectChosen}
          onClick={() => setOptionsListVisible(!optionsListVisible)}
        >
          <p className={classes.selectText}>
            {selectedPath || selectTitle || SELECT_AN_PK_OPTION}
          </p>
          <ExpandDown />
        </div>
        {disabled || (
          <FieldTree
            name={name}
            options={options}
            optionsListVisible={optionsListVisible}
            handleOptionClick={handleOptionClick}
            selectedPKField={currentSelectedKeyFieldId}
          />
        )}
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
