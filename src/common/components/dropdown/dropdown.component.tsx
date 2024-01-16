import React from 'react';
import classes from './dropdown.component.module.css';
import { OptionGroup } from './components/option-group.component';
import { ExpandDown } from '../icons/expand-down-icon.component';
import { DropdownOptionVm } from './dropdown.model';
import { SELECT_AN_OPTION } from './dropdown.const';

interface Props {
  name: string;
  options: DropdownOptionVm[];
  label?: string;
  selectTitle?: string;
  selectedField?: DropdownOptionVm;
  error?: string;
}

export const Dropdown: React.FC<Props> = props => {
  const { name, label, options, selectedField, selectTitle, error } = props;

  const [selectedPath, setSelectedPath] = React.useState(selectedField?.label);
  const [optionsListVisible, setOptionsListVisible] = React.useState(false);
  const [currentSelectedKeyFieldId, setCurrentSelectedKeyFieldId] =
    React.useState(selectedField?.id);

  const handleOptionClick = (option: DropdownOptionVm) => {
    setCurrentSelectedKeyFieldId(option.id);
    setSelectedPath(option.label);
    setOptionsListVisible(false);
  };
  console.log(error);

  return (
    <>
      <div className={classes.select}>
        <p className={classes.selectLabel}>{label ? label : ''}</p>
        <div className={classes.selectContainer}>
          <div className={classes.selectSelect}>
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
          {error && <span className={classes.error}>{error}</span>}
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
