import React from 'react';
import { useField } from 'formik';
import classes from './input-formik.component.module.css';

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
export const InputFormik: React.FC<InputFormikProps> = props => {
  const { label } = props;
  // useField allows us to extract all formik metadata about that field
  const [field, meta] = useField(props.name ?? '');
  // If the field doesn't exist then treat this as a normal input
  const inputFieldProps = field ? field : props;
  // We only want to display the field validation error message
  // if Formik is enabled, and is the field has been touched
  // not a very good UX experience to show a blank form full
  // of error a the initial state
  const hasError = Boolean(meta && meta.touched && meta.error);

  const isColorInput = props.type === 'color';
  const inputStyle: React.CSSProperties = {
    flex: isColorInput ? '1 1 auto' : undefined,
    minWidth: isColorInput ? 0 : undefined,
    height: isColorInput ? '40px' : undefined,
    padding: isColorInput ? '0' : undefined,
    borderRadius: isColorInput ? 'var(--border-radius-xs)' : undefined,
    border: isColorInput ? '1px solid var(--input-border-color)' : undefined,
    backgroundColor: isColorInput ? 'var(--bg-input)' : undefined,
    cursor: isColorInput ? 'pointer' : undefined,
    fontSize: isColorInput ? 'var(--fs-m)' : undefined,
    lineHeight: isColorInput ? '1.5em' : undefined,
    boxSizing: isColorInput ? 'border-box' : undefined,
    WebkitAppearance: isColorInput ? 'none' : undefined,
    MozAppearance: isColorInput ? 'none' : undefined,
    appearance: isColorInput ? 'none' : undefined,
    ...props.style,
  };

  const labelStyle: React.CSSProperties | undefined = isColorInput
    ? { minWidth: '20ch', margin: 0 }
    : undefined;

  return isColorInput ? (
    <div className={classes.select}>
      {label ? <p className={classes.selectLabel}>{label}</p> : null}
      <div className={classes.selectContainer}>
        <input
          {...props}
          className={classes.colorInput}
          name={inputFieldProps.name}
          onChange={inputFieldProps.onChange}
          onBlur={inputFieldProps.onBlur}
          value={inputFieldProps.value}
          style={inputStyle}
        />
        <span className={classes.error}>{hasError ? meta.error : ''}</span>
      </div>
    </div>
  ) : (
    <div className={classes.container}>
      {label ? (
        <p className={classes.label} style={labelStyle}>
          {label}
        </p>
      ) : null}
      <input
        {...props}
        name={inputFieldProps.name}
        onChange={inputFieldProps.onChange}
        onBlur={inputFieldProps.onBlur}
        value={inputFieldProps.value}
        style={inputStyle}
      />
      <span className={classes.error}>{hasError ? meta.error : ''}</span>
    </div>
  );
};
