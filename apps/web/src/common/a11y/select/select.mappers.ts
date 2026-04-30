import { A11ySelectOption } from './select.model';

export const mapInternalSelectOptionToOption = <Option>(
  internalSelectedOption: A11ySelectOption<Option> | undefined
): Option | undefined => {
  if (!internalSelectedOption) {
    return undefined;
  }
  const { ...option } = internalSelectedOption;
  return option as Option;
};
