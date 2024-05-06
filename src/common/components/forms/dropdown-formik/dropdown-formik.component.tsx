import React from 'react';
import { useField, useFormikContext } from 'formik';
import classes from './dropdown.component.module.css';
import { Dropdown, DropdownOptionVm } from '../../dropdown';

interface DropDownFormikProps {
  value?: DropdownOptionVm;
  name: string;
  options: DropdownOptionVm[];
  selectTitle?: string;
  label?: string;
}

//TODO
export const DropdownFormik: React.FC<DropDownFormikProps> = props => {
  const { options, label, selectTitle } = props;
  const formik = useFormikContext();
  //useField allows us to extract all formik metadata about that field
  const [field, meta, helpers] = useField(props.name ?? '');

  // If the field doesn't exist then treat this as a normal input
  const inputFieldProps = Boolean(field) ? field : props;
  const { setValue } = helpers;

  // We only want to display the field validation error message
  // if Formik is enabled, and is the field has been touched
  // not a very good UX experience to show a blank form full
  // of error a the initial state
  const isError = Boolean(meta && meta.touched && meta.error);

  const selectContainerRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (
      inputFieldProps.name === Object.keys(formik.errors)[0] &&
      isError &&
      selectContainerRef.current
    ) {
      selectContainerRef.current.focus();
      selectContainerRef.current.tabIndex = 0;
    }
  }, [isError]);

  return (
    <div className={classes.select} id={inputFieldProps.name}>
      <p className={classes.selectLabel}>{label ? label : ''}</p>
      <div
        className={classes.selectContainer}
        ref={selectContainerRef}
        tabIndex={-1}
      >
        <Dropdown
          name={inputFieldProps.name}
          options={options}
          selectTitle={selectTitle}
          value={inputFieldProps.value}
          isError={isError}
          onChange={field => {
            if (inputFieldProps.name === 'fromTableId') {
              formik.setFieldValue('fromFieldId', { id: '', label: '' });
            }
            if (inputFieldProps.name === 'toTableId') {
              formik.setFieldValue('toFieldId', { id: '', label: '' });
            }
            setValue(field);
          }}
          label={label}
        ></Dropdown>
        {isError && (
          <span className={classes.error} aria-live="polite">
            {meta.error}
          </span>
        )}
      </div>
    </div>
  );
};
