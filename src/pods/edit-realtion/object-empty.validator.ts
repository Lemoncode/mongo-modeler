import { FieldValidationFunctionSync } from '@lemoncode/fonk';

const validatorType = 'OBJECT_EMPTY_VALIDATOR';

let defaultMessage = 'Please inform the field';
export const setErrorMessage = (message: string) => (defaultMessage = message);

export const objectEmptyValidator: FieldValidationFunctionSync = (
  fieldValidatorArgs: any
) => {
  const { value, message = defaultMessage } = fieldValidatorArgs;

  const validationResult = {
    succeeded: false,
    type: validatorType,
    message,
  };

  if (value && value.id) {
    validationResult.succeeded = true;
    validationResult.message = '';
  }

  return validationResult;
};
