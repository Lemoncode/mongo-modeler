import React from 'react';

import classes from '../dropdown.component.module.css';
import { Tick } from '../../icons/tick-icon.component';
import { DropdownOptionVm } from '../dropdown.model';
import { Field } from 'formik';

interface Props {
  name: string;
  options: DropdownOptionVm[];
  optionsListVisible: boolean;
  handleOptionClick: (option: DropdownOptionVm) => void;
  selectedOption?: string;
}

export const OptionGroup: React.FC<Props> = props => {
  const {
    name,
    options,
    optionsListVisible,
    handleOptionClick,
    selectedOption,
  } = props;

  return (
    <ul
      className={classes.options}
      style={{ display: optionsListVisible ? 'block' : 'none' }}
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
  const { options, selectedOption, name, handleOptionClick } = props;
  return options.map(option => (
    <li key={option.id}>
      <div className={classes.svg}>
        {selectedOption === option.id ? <Tick /> : ''}
      </div>
      <label>
        <Field
          type="radio"
          name={name}
          value={option.id}
          onClick={() => handleOptionClick(option)}
        />
        {option.label}
      </label>
    </li>
  ));
};
