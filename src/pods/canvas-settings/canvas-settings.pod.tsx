import React from 'react';
import { Formik, Form } from 'formik';

import { formValidation } from './canvas-settings.validation';
import classes from './canvas-settings.pod.module.css';
interface Props {
  onChangeSettings: () => void;
}
export const CanvasSettingsComponent: React.FC<Props> = props => {
  const { onChangeSettings } = props;
  const handleSubmitSize = () => {
    onChangeSettings();
  };
  const initialValues = {};

  return (
    <div className={classes.center}>
      <Formik
        onSubmit={handleSubmitSize}
        initialValues={initialValues}
        validate={formValidation.validateForm}
      >
        {() => (
          <Form>
            <div className={classes.container}>
              <button type="submit" className="button-secondary">
                On Change Settings
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
