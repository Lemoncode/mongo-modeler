import React from 'react';
import classes from './table-pk-picker.component.module.css';
import { FieldTree } from './components/field-tree.component';
import { ExpandDown } from '../icons/expand-down-icon.component';
import { OptionVm } from './table-picker.model';
import { GUID } from '@/core/model';

// We inherit HTML input props and add an optional label prop
interface Props
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  options: OptionVm[];
  label?: string;
  selectedKeyFieldId?: GUID;
  onKeySelected: (fieldId: GUID) => void;
}

// Input props, we got this value by double clicking on a input element
// and going to definition (d.ts)
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
    <div className={classes.container}>
      <p>{label}</p>
      <div
        className={classes.customSelect}
        onClick={() => setOptionsListVisible(!optionsListVisible)}
      >
        <div className={classes.selectedOption}>
          {selectedPath || 'Selecciona una opción'}
        </div>
        <ExpandDown />
      </div>
      <FieldTree
        options={options}
        optionsListVisible={optionsListVisible}
        handleOptionClick={handleOptionClick}
        selectedPKField={currentSelectedKeyFieldId}
      />
    </div>
  );
};
