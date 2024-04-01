import React from 'react';
import { Formik, Form } from 'formik';

import { formValidation } from './canvas-settings.validation';
import classes from './canvas-settings.pod.module.css';
import useAutosave from '@/core/autosave/autosave.hook';
import { Checkbox } from '@/common/components';
interface Props {
  onChangeSettings: () => void;
}
export const CanvasSettingsComponent: React.FC<Props> = props => {
  const { onChangeSettings } = props;
  const { startAutosave, stopAutosave, deleteAutosaveStorage } = useAutosave();
  const USERSAVE_KEY = 'userSettings';

  const savedSettings = JSON.parse(localStorage.getItem(USERSAVE_KEY) || '{}');

  const initialValues = {
    autoSave:
      savedSettings.autoSave !== undefined ? savedSettings.autoSave : true,
  };

  const [settingsValues, setSettingsValues] = React.useState(initialValues);
  const [autoSaveToggled, setAutoSaveToggled] = React.useState(false);

  const handleToggleAutoSave = () => {
    const newAutoSave = !settingsValues.autoSave;
    setSettingsValues({ ...settingsValues, autoSave: newAutoSave });
    setAutoSaveToggled(true);
  };

  const handleSubmitSize = () => {
    if (autoSaveToggled) {
      if (settingsValues.autoSave) {
        startAutosave();
      } else {
        stopAutosave();
        deleteAutosaveStorage();
      }
    }
    localStorage.setItem(USERSAVE_KEY, JSON.stringify(settingsValues));
    onChangeSettings();
  };

  React.useEffect(() => {
    setSettingsValues(prevValues => ({
      ...prevValues,
      autoSave:
        savedSettings.autoSave !== undefined ? savedSettings.autoSave : true,
    }));
  }, [savedSettings.autoSave]);

  return (
    <div className={classes.center}>
      <Formik
        onSubmit={handleSubmitSize}
        initialValues={settingsValues}
        validate={formValidation.validateForm}
      >
        {() => (
          <Form>
            <div className={classes.container}>
              <div className={classes.checkboxAutoSave}>
                <Checkbox
                  id="checkboxAutoSave"
                  onChange={handleToggleAutoSave}
                  checked={settingsValues.autoSave}
                />
                <label htmlFor="checkboxAutoSave">
                  <span>Toggle Auto Save</span>
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
