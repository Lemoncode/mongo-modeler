import React from 'react';
import classes from './dropdown.component.module.css';
import { OptionGroup } from './components/option-group.component';
import { ExpandDown } from '../icons/expand-down-icon.component';
import { DropdownOptionVm } from './dropdown.model';
import { SELECT_AN_OPTION } from './dropdown.const';
import { handleFocus, handleNextFocus } from './dropdown.business';

interface Props {
  name: string;
  options: DropdownOptionVm[];
  value?: DropdownOptionVm;
  onChange: (field: DropdownOptionVm) => void;
  selectTitle?: string;
  //TODO: css class?
  isError?: boolean;
  label?: string;
}

export const Dropdown: React.FC<Props> = props => {
  const { name, options, value, selectTitle, onChange, isError, label } = props;
  const [optionsListVisible, setOptionsListVisible] = React.useState(false);

  const [selectedPath, setSelectedPath] = React.useState(value?.label);
  const [currentSelectedKeyFieldId, setCurrentSelectedKeyFieldId] =
    React.useState(value?.id || '');

  const handleOptionClick = (option: DropdownOptionVm) => {
    setCurrentSelectedKeyFieldId(option.id);
    setSelectedPath(option.label);
    setOptionsListVisible(false);
    onChange(option);
  };
  const modalRef = React.useRef<HTMLUListElement>(null);
  const selectRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOptionsListVisible(false);
      }
    };
    const handleFocusOut = (event: FocusEvent) => {
      if (
        optionsListVisible &&
        modalRef.current &&
        !modalRef.current.contains(event.relatedTarget as Node)
      ) {
        setOptionsListVisible(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setOptionsListVisible(false);
      }
    };

    if (optionsListVisible) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('focusout', handleFocusOut);
      handleFocus(selectRef, modalRef);
      const activeID = `${name}-option-${currentSelectedKeyFieldId}`;
      selectRef.current?.setAttribute('aria-activedescendant', activeID);
    } else {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
      handleNextFocus(selectRef);
      selectRef.current?.setAttribute('aria-activedescendant', '');
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('focusout', handleFocusOut);
    };
  }, [optionsListVisible]);

  return (
    <>
      <div
        className={`${classes.selectSelect} ${isError && classes.selectError} ${optionsListVisible && classes.selectActive}`}
        ref={selectRef}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={optionsListVisible}
        aria-live="polite"
        aria-controls={`${name}-select`}
        aria-activedescendant=""
        onClick={() => {
          setOptionsListVisible(!optionsListVisible);
        }}
        aria-label={label}
      >
        <p className={classes.selectText}>
          {selectedPath || selectTitle || SELECT_AN_OPTION}
        </p>
        <ExpandDown />
      </div>
      {optionsListVisible && (
        <>
          <div
            className={classes.veil}
            onClick={() => setOptionsListVisible(!optionsListVisible)}
          ></div>
          <OptionGroup
            name={name}
            options={options}
            optionsListVisible={optionsListVisible}
            handleOptionClick={handleOptionClick}
            selectedOption={currentSelectedKeyFieldId}
            modalRef={modalRef}
            label={label}
          />
        </>
      )}
    </>
  );
};
