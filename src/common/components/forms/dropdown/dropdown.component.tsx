import React from 'react';
import classes from './dropdown.component.module.css';
import { DropdownOptionVm } from './dropdown.model';
import { Dropdown } from '../../dropdown';
import { useField } from 'formik';

interface DropDownFormikProps {
  name: string;
  options: DropdownOptionVm[];
  onChange: (fields: DropdownOptionVm) => void;
  selectTitle?: string;
  selectedField?: DropdownOptionVm;
  label?: string;
}

//TODO
export const DropdownFormik: React.FC<DropDownFormikProps> = props => {
  const { options, label, selectTitle, selectedField, onChange } = props;
  // useField allows us to extract all formik metadata about that field
  const [field, meta] = useField(props.name ?? '');
  // If the field doesn't exist then treat this as a normal input
  const inputFieldProps = Boolean(field) ? field : props;
  // We only want to display the field validation error message
  // if Formik is enabled, and is the field has been touched
  // not a very good UX experience to show a blank form full
  // of error a the initial state
  const isError = Boolean(meta && meta.touched && meta.error);

  return (
    <>
      <div className={classes.select}>
        <p className={classes.selectLabel}>{label ? label : ''}</p>
        <div className={classes.selectContainer}>
          <Dropdown
            name={inputFieldProps.name}
            onChange={onChange}
            options={options}
            selectTitle={selectTitle}
            selectedField={selectedField}
            isError={isError}
          ></Dropdown>
          {isError && <span className={classes.error}>{meta.error}</span>}
        </div>
      </div>
    </>
  );
};
