import React from 'react';
import classes from './table-pk-picker.component.module.css';
import { FieldTree } from './components/field-tree.component';
import { ExpandDown } from '../icons/expand-down-icon.component';
import { OptionVm } from './table-picker.model';
import { GUID } from '@/core/model';

interface Props {
  options: OptionVm[];
  label?: string;
  selectedKeyFieldId?: GUID;
  onKeySelected: (fieldId: GUID) => void;
}

export const TablePkPicker: React.FC<Props> = props => {
  const { label, options, onKeySelected, selectedKeyFieldId } = props;

  const [selectedPath, setSelectedPath] = React.useState('');
  const [optionsListVisible, setOptionsListVisible] = React.useState(false);
  const [currentSelectedKeyFieldId, setCurrentSelectedKeyFieldId] =
    React.useState(selectedKeyFieldId);

  const handleOptionClick = (
    option: OptionVm,
    parentPath: string,
    id: string
  ) => {
    setCurrentSelectedKeyFieldId(id);
    const currentPath = parentPath
      ? `${parentPath} > ${option.label}`
      : option.label;
    setSelectedPath(currentPath);
    setOptionsListVisible(false);
    onKeySelected(option.id);
  };

  return (
    <div className={classes.select}>
      <p className={classes.selectLabel}>{label}</p>
      <div
        className={classes.selectSelect}
        onClick={() => setOptionsListVisible(!optionsListVisible)}
      >
        <p className={classes.selectText}>
          {selectedPath || 'Selecciona una opción'}
        </p>
        <ExpandDown />
        <FieldTree
          options={options}
          optionsListVisible={optionsListVisible}
          handleOptionClick={handleOptionClick}
          selectedPKField={currentSelectedKeyFieldId}
        />
      </div>
    </div>
  );
};
