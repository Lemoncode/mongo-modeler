import React from 'react';
import { GUID } from '@/core/model';
import classes from './select-formik.component.module.css';
import { SelectFormikList } from './components/select-formik-list.component';
import { ExpandDown } from '../icons/expand-down-icon.component';

export interface OptionVm {
  id: GUID;
  label: string;
  children?: OptionVm[];
}

// We inherit HTML input props and add an optional label prop
interface SelectFormikProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  options: OptionVm[];
  label?: string;
}

// Input props, we got this value by double clicking on a input element
// and going to definition (d.ts)
export const SelectFormik: React.FC<SelectFormikProps> = props => {
  const { label, options } = props;
  //   // useField allows us to extract all formik metadata about that field
  //   const [field, meta] = useField(props.name ?? '');
  //   // If the field doesn't exist then treat this as a normal input
  //   const inputFieldProps = Boolean(field) ? field : props;
  //   // We only want to display the field validation error message
  //   // if Formik is enabled, and is the field has been touched
  //   // not a very good UX experience to show a blank form full
  //   // of error a the initial state
  //   const hasError = Boolean(meta && meta.touched && meta.error);

  //   return (
  //     <div className={classes.container}>
  //       {label ? <span>{label}</span> : null}
  //       <input
  //         {...props}
  //         name={inputFieldProps.name}
  //         onChange={inputFieldProps.onChange}
  //         onBlur={inputFieldProps.onBlur}
  //         value={inputFieldProps.value}
  //         style={{ width: '100%' }}
  //       />
  //       <span className={classes.error}>{hasError ? meta.error : ''}</span>
  //     </div>
  //   );

  const [selectedPath, setSelectedPath] = React.useState('');
  const [optionsListVisible, setOptionsListVisible] = React.useState(false);
  const [selectedLabel, setSelectedLabel] = React.useState('');

  const handleOptionClick = (
    option: OptionVm,
    parentPath: string,
    id: string
  ) => {
    setSelectedLabel(id);
    const currentPath = parentPath
      ? `${parentPath} > ${option.label}`
      : option.label;
    setSelectedPath(currentPath);
    setOptionsListVisible(false);
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
      <SelectFormikList
        options={options}
        optionsListVisible={optionsListVisible}
        handleOptionClick={handleOptionClick}
        selectedLabel={selectedLabel}
      />
    </div>
  );
};
