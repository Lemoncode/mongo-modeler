import React from 'react';

import classes from '../dropdown.component.module.css';
import { Tick } from '../../icons/tick-icon.component';
import { DropdownOptionVm } from '../dropdown.model';

interface Props {
  name: string;
  options: DropdownOptionVm[];
  optionsListVisible: boolean;
  handleOptionClick: (option: DropdownOptionVm) => void;
  selectedPKField?: string;
}

export const OptionGroup: React.FC<Props> = props => {
  const {
    name,
    options,
    optionsListVisible,
    handleOptionClick,
    selectedPKField,
  } = props;

  return (
    <ul
      className={classes.options}
      style={{ display: optionsListVisible ? 'block' : 'none' }}
    >
      {options.map(option => (
        <li key={option.id}>
          <div className={classes.svg}>
            {selectedPKField === option.id ? <Tick /> : ''}
          </div>
          <label>
            <input
              type="radio"
              name={name}
              value={option.id}
              onClick={() => handleOptionClick(option)}
            />
            {option.label}
          </label>
        </li>
      ))}
    </ul>
  );
};

//options.map -- lo saco a tro componente??
