import React from 'react';
import classes from './dropdown.component.module.css';
import { OptionGroup } from './components/option-group.component';
import { ExpandDown } from '../icons/expand-down-icon.component';
import { DropdownOptionVm } from './dropdown.model';
import { SELECT_AN_OPTION } from './dropdown.const';

interface Props {
  name: string;
  options: DropdownOptionVm[];
  onChange: (field: DropdownOptionVm) => void;
  selectTitle?: string;
  selectedField?: DropdownOptionVm;
  //TODO: css class?
  isError?: boolean;
}

//TODO: isError
export const Dropdown: React.FC<Props> = props => {
  const { name, options, selectedField, selectTitle, onChange, isError } =
    props;

  const [selectedPath, setSelectedPath] = React.useState(selectedField?.label);
  const [optionsListVisible, setOptionsListVisible] = React.useState(false);
  const [currentSelectedKeyFieldId, setCurrentSelectedKeyFieldId] =
    React.useState(selectedField?.id);

  const handleOptionClick = (option: DropdownOptionVm) => {
    setCurrentSelectedKeyFieldId(option.id);
    setSelectedPath(option.label);
    setOptionsListVisible(false);
    onChange(option);
  };

  return (
    <>
      <div
        className={`${classes.selectSelect} ${isError && classes.selectError}`}
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
