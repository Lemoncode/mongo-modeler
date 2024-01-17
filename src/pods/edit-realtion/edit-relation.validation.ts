import { createFormikValidation } from '@lemoncode/fonk-formik';

import { ValidationSchema, Validators } from '@lemoncode/fonk';
import { objectEmptyValidator } from './object-empty.validator';

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
        validator: objectEmptyValidator as any,
        message: 'Selected table option is required',
      },
    ],
    toTableId: [
      {
        validator: objectEmptyValidator,
        message: 'Selected table option is required',
      },
    ],
    fromFieldId: [
      {
        validator: objectEmptyValidator,
        message: 'Selected field option is required',
      },
    ],
    toFieldId: [
      {
        validator: objectEmptyValidator,
        message: 'Selected field option is required',
      },
    ],
  },
};

export const formValidation = createFormikValidation(validationSchema);
