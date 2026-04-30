import React from 'react';

import classes from './table-pk-picker.component.module.css';
import { FieldTree } from './components/field-tree.component';
import { ExpandDown } from '../icons/expand-down-icon.component';
import { PkOptionVm } from './table-pk-picker.model';
import { SELECT_AN_PK_OPTION } from './table-pk-picker.const';
import { findPath } from './table-pk-picker.business';
import { FlatOption, useA11yNestedSelect } from '@/common/a11y';
import { GUID } from '@/core/model';

interface Props {
  name: string;
  options: PkOptionVm[];
  value?: string | undefined;
  onChange: (id: string | undefined) => void;
  selectTitle?: string;
  isError?: boolean;
  disabled?: boolean;
}

export const TablePkPicker: React.FC<Props> = props => {
  const { name, options, selectTitle, value, onChange, disabled, isError } =
    props;

  const findSelectedOptionRecursively = (
    id: GUID | undefined,
    options: PkOptionVm[]
  ): PkOptionVm | undefined => {
    if (!id) return undefined;
    for (const option of options) {
      if (option.id === id) return option;
      if (option.children) {
        const found = findSelectedOptionRecursively(id, option.children);
        if (found) return found;
      }
    }
    return undefined;
  };

  const handleChange = (option: FlatOption<PkOptionVm> | undefined) => {
    option ? onChange(option.id) : onChange(undefined);
  };

  const {
    optionListRef,
    buttonRef,
    veilRef,
    options: a11yOptions,
    isOpen,
    setIsOpen,
    onFocusOption,
    selectedOption,
    setSelectedOption,
  } = useA11yNestedSelect(
    options,
    option => option.id,
    findSelectedOptionRecursively(value, options),
    handleChange
  );

  const selectedPath = findPath(selectedOption?.id, a11yOptions);

  return (
    <>
      <button
        type="button"
        className={`${classes.selectSelect} ${
          isError && !disabled && classes.selectError
        } ${disabled && classes.selectDisabled} ${isOpen && classes.selectActive}`}
        ref={buttonRef}
        role="combobox"
        id={`combobox-${name}`}
        aria-haspopup="tree"
        aria-expanded={isOpen}
        aria-labelledby={name}
        aria-controls={`${name}-select`}
        aria-activedescendant={selectedOption?.id}
        onClick={() => {
          if (!disabled) setIsOpen(!isOpen);
        }}
        aria-disabled={disabled}
        tabIndex={0}
      >
        <p className={classes.selectText}>
          {selectedPath || selectTitle || SELECT_AN_PK_OPTION}
        </p>
        <ExpandDown />
        {isOpen && (
          <>
            <div
              ref={veilRef}
              aria-hidden="true"
              className={classes.veil}
            ></div>
            <FieldTree
              ref={optionListRef}
              name={name}
              options={a11yOptions}
              selectedOption={selectedOption?.id}
              onOptionClick={setSelectedOption}
              onFocusOption={onFocusOption}
            />
          </>
        )}
      </button>
    </>
  );
};
