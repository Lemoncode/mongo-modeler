import React from 'react';
import classes from './dropdown.component.module.css';
import { OptionGroup } from './components/option-group.component';
import { ExpandDown } from '../icons/expand-down-icon.component';
import { DropdownOptionVm } from './dropdown.model';

interface Props {
  name: string;
  options: DropdownOptionVm[];
  label?: string;
  onKeySelected: (field: DropdownOptionVm) => void;
  selectTitle?: string;
  selectedField?: DropdownOptionVm;
}

export const Dropdown: React.FC<Props> = props => {
  const { name, label, options, onKeySelected, selectedField, selectTitle } =
    props;

  const [selectedPath, setSelectedPath] = React.useState(selectedField?.label);
  const [optionsListVisible, setOptionsListVisible] = React.useState(false);
  const [currentSelectedKeyFieldId, setCurrentSelectedKeyFieldId] =
    React.useState(selectedField?.id);

  const handleOptionClick = (option: DropdownOptionVm) => {
    setCurrentSelectedKeyFieldId(option.id);
    setSelectedPath(option.label);
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
          <OptionGroup
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
