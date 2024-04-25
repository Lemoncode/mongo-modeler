import React from 'react';

import classes from '../dropdown.component.module.css';
import { Tick } from '../../icons/tick-icon.component';
import { DropdownOptionVm } from '../dropdown.model';

interface Props {
  name: string;
  options: DropdownOptionVm[];
  optionsListVisible: boolean;
  handleOptionClick: (option: DropdownOptionVm) => void;
  selectedOption?: string;
  modalRef: React.RefObject<HTMLUListElement>;
  label?: string;
}

export const OptionGroup: React.FC<Props> = props => {
  const {
    name,
    options,
    optionsListVisible,
    handleOptionClick,
    selectedOption,
    modalRef,
    label,
  } = props;

  return (
    <ul
      className={classes.options}
      style={{ display: optionsListVisible ? 'block' : 'none' }}
      ref={modalRef}
      onClick={e => e.stopPropagation()}
      id={`${name}-select`}
      role="listbox"
      aria-label={label}
    >
      <Option
        name={name}
        options={options}
        handleOptionClick={handleOptionClick}
        selectedOption={selectedOption}
      ></Option>
    </ul>
  );
};

interface OptionProps {
  name: string;
  options: DropdownOptionVm[];
  handleOptionClick: (option: DropdownOptionVm) => void;
  selectedOption?: string;
}

const Option: React.FC<OptionProps> = props => {
  const { options, selectedOption, handleOptionClick, name } = props;

  return options.map(option => (
    <li
      key={option.id}
      role="option"
      onClick={() => handleOptionClick(option)}
      aria-selected={selectedOption === option.id}
      id={`${name}-option-${option.id}`}
    >
      {option.label}
      <div className={classes.svg}>
        {selectedOption === option.id ? <Tick /> : ''}
      </div>
    </li>
  ));
};
