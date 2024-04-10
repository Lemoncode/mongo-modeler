import React from 'react';
import { Formik, Form } from 'formik';

import { formValidation } from './canvas-settings.validation';
import classes from './canvas-settings.pod.module.css';

import { Checkbox } from '@/common/components';
import { useCanvasViewSettingsContext } from '@/core/providers';
interface Props {
  onChangeSettings: () => void;
}
export const CanvasSettingsComponent: React.FC<Props> = props => {
  const { onChangeSettings } = props;
  const { autoSave, setAutoSave } = useCanvasViewSettingsContext();
  const [changedValue, setChangedValue] = React.useState<boolean>(false);

  const handleCheckboxChange = () => {
    setChangedValue(!changedValue);
  };

  const handleSubmitSize = () => {
    setAutoSave(changedValue);
    onChangeSettings();
  };

  React.useEffect(() => {
    setChangedValue(autoSave);
  }, [autoSave]);

  return (
    <div className={classes.center}>
      <Formik
        onSubmit={handleSubmitSize}
        initialValues={autoSave}
        validate={formValidation.validateForm}
      >
        {() => (
          <Form>
            <div className={classes.container}>
              <div className={classes.checkboxAutoSave}>
                <Checkbox
                  id="checkboxAutoSave"
                  onChange={handleCheckboxChange}
                  checked={changedValue}
                />
                <label htmlFor="checkboxAutoSave">
                  {changedValue ? (
                    <span>Disable Auto Save</span>
                  ) : (
                    <span>Enable Auto Save</span>
                  )}
                </label>
              </div>
              <button type="submit" className="button-secondary">
                Save Settings
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
