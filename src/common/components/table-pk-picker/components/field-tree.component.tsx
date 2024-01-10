import React from 'react';
import { OptionVm } from '../table-picker.model';
import classes from '../table-pk-picker.component.module.css';
import { generateOptions } from './field-tree.business';

interface Props {
  options: OptionVm[];
  optionsListVisible: boolean;
  handleOptionClick: (
    option: OptionVm,
    parentPath: string,
    index: string
  ) => void;
  selectedPKField?: string;
}

export const FieldTree: React.FC<Props> = props => {
  const { options, optionsListVisible, handleOptionClick, selectedPKField } =
    props;

  return (
    <ul
      className={classes.options}
      style={{ display: optionsListVisible ? 'block' : 'none' }}
    >
      {generateOptions(options, '', handleOptionClick, selectedPKField)}
    </ul>
  );
};
