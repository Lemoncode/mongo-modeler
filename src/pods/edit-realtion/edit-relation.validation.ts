import { createFormikValidation } from '@lemoncode/fonk-formik';

import { ValidationSchema, Validators } from '@lemoncode/fonk';

export const validationSchema: ValidationSchema = {
  field: {
    'type.id': [
      {
        validator: Validators.required,
        message: 'Selected type option is required',
      },
    ],
    'fromTableId.id': [
      {
        validator: Validators.required,
        message: 'Selected table option is required',
      },
    ],
    'toTableId.id': [
      {
        validator: Validators.required,
        message: 'Selected table option is required',
      },
    ],
    'fromFieldId.id': [
      {
        validator: Validators.required,
        message: 'Selected field option is required',
      },
    ],
    'toFieldId.id': [
      {
        validator: Validators.required,
        message: 'Selected field option is required',
      },
    ],
  },
};

export const formValidation = createFormikValidation(validationSchema);
