import { createFormikValidation } from '@lemoncode/fonk-formik';

import { ValidationSchema } from '@lemoncode/fonk';
import { objectEmptyIdValidator } from './object-empty-id.validator';

export const validationSchema: ValidationSchema = {
  field: {
    type: [
      {
        validator: objectEmptyIdValidator,
        message: 'Selected type option is required',
      },
    ],
    fromTableId: [
      {
        validator: objectEmptyIdValidator,
        message: 'Selected table option is required',
      },
    ],
    toTableId: [
      {
        validator: objectEmptyIdValidator,
        message: 'Selected table option is required',
      },
    ],
    fromFieldId: [
      {
        validator: objectEmptyIdValidator,
        message: 'Selected field option is required',
      },
    ],
    toFieldId: [
      {
        validator: objectEmptyIdValidator,
        message: 'Selected field option is required',
      },
    ],
  },
};

export const formValidation = createFormikValidation(validationSchema);
