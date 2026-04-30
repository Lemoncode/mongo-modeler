import React from 'react';
import { useField } from 'formik';
import classes from './checkbox-formik.component.module.css';

// We inherit HTML input props and add an optional label prop
interface InputFormikProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string;
}

// Input props, we got this value by double clicking on a input element
// and going to definition (d.ts)
export const CheckboxFormik: React.FC<InputFormikProps> = props => {
  const { label, disabled } = props;
  // useField allows us to extract all formik metadata about that field
  const [field, meta] = useField(props.name ?? '');
  // If the field doesn't exist then treat this as a normal input
  const inputFieldProps = Boolean(field) ? field : props;
  // We only want to display the field validation error message
  // if Formik is enabled, and is the field has been touched
  // not a very good UX experience to show a blank form full
  // of error a the initial state
  const hasError = Boolean(meta && meta.touched && meta.error);

  return (
    <div className={classes.container}>
      <div className={classes.labelInput}>
        {label ? <label htmlFor={inputFieldProps.name}>{label}</label> : null}
        <div className={`${classes.checkbox} ${disabled && classes.disabled}`}>
          <input
            {...props}
            id={inputFieldProps.name}
            name={inputFieldProps.name}
            type="checkbox"
            checked={inputFieldProps.value}
            onChange={inputFieldProps.onChange}
          />
          <div>
            <svg viewBox="0,0,50,50">
              <path d="M5 30 L 20 45 L 45 8"></path>
            </svg>
          </div>
        </div>
      </div>
      <span className={classes.error}>{hasError ? meta.error : ''}</span>
    </div>
  );
};
