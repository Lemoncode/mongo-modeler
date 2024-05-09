import React from 'react';
import classes from './table-pk-picker.component.module.css';
import { FieldTree } from './components/field-tree.component';
import { ExpandDown } from '../icons/expand-down-icon.component';
import { PkOptionVm } from './table-pk-picker.model';
import { SELECT_AN_PK_OPTION } from './table-pk-picker.const';
import {
  generateLabel,
  handleFocus,
  handleNextFocus,
} from './table-pk-picker.business';

interface Props {
  name: string;
  options: PkOptionVm[];
  value?: PkOptionVm;
  onChange: (field: PkOptionVm) => void;
  selectTitle?: string;
  isError?: boolean;
  disabled?: boolean;
}

export const TablePkPicker: React.FC<Props> = props => {
  const { name, options, selectTitle, value, onChange, disabled, isError } =
    props;

  const path = value?.label && generateLabel(options, value.id, []);
  const [selectedPath, setSelectedPath] = React.useState(path);
  const [optionsListVisible, setOptionsListVisible] = React.useState(false);
  const [currentSelectedKeyFieldId, setCurrentSelectedKeyFieldId] =
    React.useState(value?.id);

  const handleOptionClick = (option: PkOptionVm, parentPath: string) => {
    setCurrentSelectedKeyFieldId(option.id);
    const currentPath = parentPath
      ? `${parentPath} > ${option.label}`
      : option.label;
    setSelectedPath(currentPath);
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
  React.useEffect(() => {
    if (!value?.label) setSelectedPath('');
  }, [value]);

  return (
    <>
      <div
        className={`${classes.selectSelect} ${
          isError && !disabled && classes.selectError
        } ${disabled && classes.selectDisabled} ${optionsListVisible && classes.selectActive}`}
        ref={selectRef}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={optionsListVisible}
        aria-live="polite"
        aria-controls={`${name}-select`}
        aria-activedescendant=""
        onClick={() => {
          if (!disabled) setOptionsListVisible(!optionsListVisible);
        }}
        aria-disabled={disabled}
      >
        <p className={classes.selectText}>
          {selectedPath || selectTitle || SELECT_AN_PK_OPTION}
        </p>
        <ExpandDown />
      </div>
      {optionsListVisible && (
        <>
          <div
            className={classes.veil}
            onClick={() => setOptionsListVisible(!optionsListVisible)}
          ></div>
          <FieldTree
            name={name}
            options={options}
            optionsListVisible={optionsListVisible}
            handleOptionClick={handleOptionClick}
            selectedPKField={currentSelectedKeyFieldId}
            modalRef={modalRef}
            label={selectTitle || SELECT_AN_PK_OPTION}
          />
        </>
      )}
    </>
  );
};
