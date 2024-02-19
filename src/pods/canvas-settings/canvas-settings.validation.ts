import { ValidationSchema } from '@lemoncode/fonk';
import { createFormikValidation } from '@lemoncode/fonk-formik';

const validationSchema: ValidationSchema = {
  field: {},
};

export const formValidation = createFormikValidation(validationSchema);
