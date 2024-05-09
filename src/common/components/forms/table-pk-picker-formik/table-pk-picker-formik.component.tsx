import React from 'react';
import { useField, useFormikContext } from 'formik';
import { PkOptionVm, TablePkPicker } from '../../table-pk-picker';
import classes from './table-pk-picker.component.module.css';

interface Props {
  name: string;
  options: PkOptionVm[];
  label?: string;
  value?: PkOptionVm;
  selectTitle?: string;
  disabled?: boolean;
}

export const TablePkPickerFormik: React.FC<Props> = props => {
  const { options, label, selectTitle, disabled } = props;
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
    <>
      <div className={classes.select}>
        <p className={classes.selectLabel}>{label ? label : ''}</p>
        <div
          className={classes.selectContainer}
          ref={selectContainerRef}
          tabIndex={-1}
        >
          <TablePkPicker
            name={inputFieldProps.name}
            options={options}
            selectTitle={selectTitle}
            value={inputFieldProps.value}
            isError={isError}
            onChange={field => {
              setValue(field);
            }}
            disabled={disabled}
          ></TablePkPicker>
          {isError && (
            <span className={classes.error} aria-live="polite">
              {meta.error}
            </span>
          )}
        </div>
      </div>
    </>
  );
};
