import React from 'react';
import { useField } from 'formik';
import classes from './input-formik.component.module.css';

interface InputFormikProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string;
}

// Input props, we got this value by double clicking on a input element
// and going to definition (d.ts)
export const InputFormik: React.FC<InputFormikProps> = props => {
  const { label } = props;
  // useField allows us to extract all formik metadata about that field
  const [field, meta] = useField(props.name ?? '');
  // If the field doesn't exist then treat this as a normal input
  const inputFieldProps = Boolean(field) ? field : props;
  // We only want to display the field validation error messsage
  // if formik is enabled, and is the field has been touched
  // not a very good UX experience to show a blank form full
  // of error a the initial state
  const hasError = Boolean(meta && meta.touched && meta.error);

  // Harcoded styles here... pending to add
  // CSS modules (next example) or CSS in JS solution :)
  return (
    <div className={classes.container}>
      {label ? <span>{label}</span> : null}
      <input
        {...props}
        name={inputFieldProps.name}
        onChange={inputFieldProps.onChange}
        onBlur={inputFieldProps.onBlur}
        value={inputFieldProps.value}
        style={{ width: '100%' }}
      />
      <span className={classes.error}>{hasError ? meta.error : ''}</span>
    </div>
  );
};
