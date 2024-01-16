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
  },
  // Puedes añadir más grupos según sea necesario
};

export const formValidation = createFormikValidation(validationSchema);
