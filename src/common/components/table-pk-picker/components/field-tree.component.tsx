import React from 'react';
import { PkOptionVm } from '../table-pk-picker.model';
import classes from '../table-pk-picker.component.module.css';
import { GenerateOptions } from './generate-options.component';

interface Props {
  name: string;
  options: PkOptionVm[];
  optionsListVisible: boolean;
  handleOptionClick: (option: PkOptionVm, parentPath: string) => void;
  selectedPKField?: string;
}

export const FieldTree: React.FC<Props> = props => {
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
      <GenerateOptions
        name={name}
        options={options}
        parentPath=""
        handleSelectPKField={handleOptionClick}
        selectedPKField={selectedPKField}
      />
    </ul>
  );
};
