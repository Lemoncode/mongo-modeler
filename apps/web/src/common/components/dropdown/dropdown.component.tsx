import React from 'react';
import classes from './dropdown.component.module.css';
import { ExpandDown } from '../icons/expand-down-icon.component';
import { DropdownOptionVm } from './dropdown.model';
import { SELECT_AN_OPTION } from './dropdown.const';
import { useA11ySelect } from '@/common/a11y';
import { Tick } from '../icons/tick-icon.component';

// import { handleFocus, handleNextFocus } from './dropdown.business';

interface Props {
  name: string;
  options: DropdownOptionVm[];
  value?: string;
  onChange: (field: string) => void;
  selectTitle?: string;
  //TODO: css class?
  isError?: boolean;
}

export const Dropdown: React.FC<Props> = props => {
  const { name, options, selectTitle, value, onChange, isError } = props;

  const findSelectedOption = (value: string | undefined) => {
    return options.find(option => option.id === value);
  };
  const handleChange = (option: DropdownOptionVm | undefined) => {
    option ? onChange(option.id) : onChange('');
  };

  const {
    optionListRef,
    buttonRef,
    veilRef,
    isOpen,
    setIsOpen,
    options: a11yOptions,
    selectedOption,
    setSelectedOption,
    onFocusOption,
  } = useA11ySelect(
    options,
    option => option.id,
    findSelectedOption(value),
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
          {selectedOption?.label || selectTitle || SELECT_AN_OPTION}
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
                  aria-selected={selectedOption?.id === option.id}
                  onClick={() => setSelectedOption(option.id)}
                  ref={onFocusOption(option)}
                >
                  <div className={classes.svg} aria-hidden="true">
                    {selectedOption?.id === option.id ? <Tick /> : ''}
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
