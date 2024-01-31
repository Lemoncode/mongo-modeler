import React from 'react';
import classes from './dropdown.component.module.css';
import { OptionGroup } from './components/option-group.component';
import { ExpandDown } from '../icons/expand-down-icon.component';
import { DropdownOptionVm } from './dropdown.model';
import { SELECT_AN_OPTION } from './dropdown.const';

interface Props {
  name: string;
  options: DropdownOptionVm[];
  value?: DropdownOptionVm;
  onChange: (field: DropdownOptionVm) => void;
  selectTitle?: string;
  //TODO: css class?
  isError?: boolean;
}

export const Dropdown: React.FC<Props> = props => {
  const { name, options, value, selectTitle, onChange, isError } = props;
  const [optionsListVisible, setOptionsListVisible] = React.useState(false);

  const [selectedPath, setSelectedPath] = React.useState(value?.label);
  const [currentSelectedKeyFieldId, setCurrentSelectedKeyFieldId] =
    React.useState(value?.id || '');

  const handleOptionClick = (option: DropdownOptionVm) => {
    setCurrentSelectedKeyFieldId(option.id);
    setSelectedPath(option.label);
    setOptionsListVisible(false);
    onChange(option);
  };

  return (
    <>
      <div
        className={`${classes.selectSelect} ${isError && classes.selectError} ${optionsListVisible && classes.selectActive}`}
      >
        <div
          className={classes.selectChosen}
          onClick={() => setOptionsListVisible(!optionsListVisible)}
        >
          <p className={classes.selectText}>
            {selectedPath || selectTitle || SELECT_AN_OPTION}
          </p>
          <ExpandDown />
        </div>
        <OptionGroup
          name={name}
          options={options}
          optionsListVisible={optionsListVisible}
          handleOptionClick={handleOptionClick}
          selectedOption={currentSelectedKeyFieldId}
        />
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
