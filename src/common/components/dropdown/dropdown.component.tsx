import React from 'react';
import classes from './dropdown.component.module.css';
import { ExpandDown } from '../icons/expand-down-icon.component';
import { DropdownOptionVm } from './dropdown.model';
import { SELECT_AN_OPTION } from './dropdown.const';
import { useA11ySelect } from '@/common/a11y';
import { Tick } from '../icons/tick-icon.component';

interface Props {
  name: string;
  options: DropdownOptionVm[];
  value?: string[]; // Change to an array for multi-selection
  onChange: (fields: string[]) => void; // Update to handle multiple selections
  selectTitle?: string;
  isError?: boolean;
  multiSelect?: boolean; // Add multiSelect prop
}

export const Dropdown: React.FC<Props> = props => {
  const {
    name,
    options,
    selectTitle,
    value = [],
    onChange,
    isError,
    multiSelect,
  } = props;

  const findSelectedOptions = (value: string[] | undefined) => {
    return options.filter(option => value?.includes(option.id));
  };

  const handleChange = (option: DropdownOptionVm | undefined) => {
    if (!option) return; // Handle undefined case
    if (multiSelect) {
      // Handle multi-selection logic
      const newValue = value.includes(option.id)
        ? value.filter(v => v !== option.id) // Remove if already selected
        : [...value, option.id]; // Add if not selected
      onChange(newValue);
    } else {
      // Handle single selection
      onChange([option.id]);
    }
  };

  const {
    optionListRef,
    buttonRef,
    veilRef,
    isOpen,
    setIsOpen,
    options: a11yOptions,
    selectedOption,
    onFocusOption,
  } = useA11ySelect(
    options,
    option => option.id,
    multiSelect ? undefined : findSelectedOptions(value)[0], // Handle single or multi-select
    handleChange
  );

  return (
    <>
      <button
        className={`${classes.selectSelect} ${isError && classes.selectError} ${isOpen && classes.selectActive}`}
        ref={buttonRef}
        id={`combobox-${name}`}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={`listbox-${name}`}
        aria-activedescendant={selectedOption?.id}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        aria-labelledby={name}
        tabIndex={0}
      >
        <p className={classes.selectText}>
          {multiSelect
            ? value
                .map(id => options.find(option => option.id === id)?.label)
                .join(', ') ||
              selectTitle ||
              SELECT_AN_OPTION
            : selectedOption?.label || selectTitle || SELECT_AN_OPTION}
        </p>
        <ExpandDown />
        {isOpen && (
          <>
            <div
              ref={veilRef}
              className={classes.veil}
              aria-hidden="true"
            ></div>
            <ul
              id={`listbox-${name}`}
              role="listbox"
              aria-labelledby={name}
              tabIndex={-1}
              ref={optionListRef}
              className={classes.options}
              onClick={e => e.stopPropagation()}
            >
              {a11yOptions.map(option => (
                <li
                  key={option.id}
                  role="option"
                  tabIndex={option.tabIndex}
                  aria-selected={value.includes(option.id)} // Check if the option is selected
                  onClick={() => handleChange(option)}
                  ref={onFocusOption(option)}
                >
                  <div className={classes.svg} aria-hidden="true">
                    {value.includes(option.id) ? <Tick /> : ''}
                  </div>
                  {option.label}
                </li>
              ))}
            </ul>
          </>
        )}
      </button>
    </>
  );
};
