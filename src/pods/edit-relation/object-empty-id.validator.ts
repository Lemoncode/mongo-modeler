import { FieldValidationFunctionSync } from '@lemoncode/fonk';

const validatorType = 'OBJECT_EMPTY_VALIDATOR';

let defaultMessage = 'Please inform the field';
export const setErrorMessage = (message: string) => (defaultMessage = message);

export const objectEmptyIdValidator: FieldValidationFunctionSync = (
  fieldValidatorArgs: any
) => {
  const { value, message = defaultMessage } = fieldValidatorArgs;

  const validationResult = {
    succeeded: false,
    type: validatorType,
    message,
  };

  //the object must have an id value
  if (value && value.id) {
    validationResult.succeeded = true;
    validationResult.message = '';
  }

  return validationResult;
};
