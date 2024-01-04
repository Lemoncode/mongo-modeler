import React from 'react';
import { Formik, Form } from 'formik';
import { Size } from '@/core/model';
import { InputFormik } from '@/common/components/forms';
import { formValidation } from './canvas-settings.validation';
import classes from './canvas-settings.pod.module.css';

interface Props {
  size: Size;
  onChangeSize: (size: Size) => void;
}

export const CanvasSettingsComponent: React.FC<Props> = props => {
  const { size, onChangeSize } = props;

  const handleSubmitSize = (editSize: Size) => {
    onChangeSize(editSize);
  };

  return (
    <div>
      <h2>Canvas Settings</h2>
      <Formik
        onSubmit={handleSubmitSize}
        initialValues={size}
        validate={formValidation.validateForm}
      >
        {() => (
          <Form>
            <div className={classes.container}>
              <InputFormik label="Width" name="width" placeholder="Width" />
              <InputFormik label="Height" name="height" placeholder="Height" />
              <button type="submit">On Change Settings</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
