import { createFormikValidation } from '@lemoncode/fonk-formik';

import { ValidationSchema, Validators } from '@lemoncode/fonk';

export const validationSchema: ValidationSchema = {
  field: {
    type: [
      {
        validator: Validators.required,
        message: 'Selected type option is required',
      },
    ],
    fromTableId: [
      {
        validator: Validators.required,
        message: 'Selected table option is required',
      },
    ],
    toTableId: [
      {
        validator: Validators.required,
        message: 'Selected table option is required',
      },
    ],
    fromFieldId: [
      {
        validator: Validators.required,
        message: 'Selected field option is required',
      },
    ],
    toFieldId: [
      {
        validator: Validators.required,
        message: 'Selected field option is required',
      },
    ],
  },
};

export const formValidation = createFormikValidation(validationSchema);
