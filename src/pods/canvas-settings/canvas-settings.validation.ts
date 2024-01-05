import { ValidationSchema, Validators } from '@lemoncode/fonk';
import { createFormikValidation } from '@lemoncode/fonk-formik';
import { isNumber } from '@lemoncode/fonk-is-number-validator';
import { minNumber } from '@lemoncode/fonk-min-number-validator';

const validationSchema: ValidationSchema = {
  field: {
    // TODO: Check in Fonk isNumber seems not to work fine with strict mode (typescript)
    width: [
      Validators.required,
      isNumber as any,
      {
        validator: minNumber.validator,
        customArgs: { minValue: 499, inclusive: false },
      },
    ],
    height: [
      Validators.required,
      isNumber as any,
      {
        validator: minNumber.validator,
        customArgs: { minValue: 499, inclusive: false },
      },
    ],
  },
};

export const formValidation = createFormikValidation(validationSchema);
