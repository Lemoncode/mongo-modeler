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
  modalRef: React.RefObject<HTMLUListElement>;
  label: string;
}

export const FieldTree: React.FC<Props> = props => {
  const {
    name,
    options,
    optionsListVisible,
    handleOptionClick,
    selectedPKField,
    modalRef,
    label,
  } = props;

  return (
    <ul
      className={classes.options}
      style={{ display: optionsListVisible ? 'block' : 'none' }}
      role="listbox"
      ref={modalRef}
      onClick={e => e.stopPropagation()}
      id={`${name}-select`}
      aria-label={label}
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
