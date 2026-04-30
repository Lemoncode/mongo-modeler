import { A11ySelectOption } from './select.model';

export const updateFocusBySelectedOption =
  <Option>(
    getOptionId: <Key extends keyof Option>(option: Option) => Option[Key],
    selectedOption: Option | undefined
  ) =>
  (options: Option[]): A11ySelectOption<Option>[] => {
    const selectedOptionId = Boolean(selectedOption)
      ? getOptionId(selectedOption!)
      : undefined;

    const a11ySelectionOptions = options.map(option => ({
      ...option,
      tabIndex: getOptionId(option) === selectedOptionId ? 0 : -1,
      isSelectable:
        (option as Partial<{ isSelectable: boolean }>).isSelectable ?? true,
    }));

    if (!a11ySelectionOptions.some(option => option.tabIndex === 0)) {
      a11ySelectionOptions[0].tabIndex = 0;
    }
    return a11ySelectionOptions;
  };

const mapValueToSelectedOption = <Option>(
  option: Option
): A11ySelectOption<Option> => ({
  ...option,
  tabIndex: 0,
  isSelectable: true,
});

export const valueToA11ySelectedOption = <Option>(
  options: Option[],
  getOptionId: <Key extends keyof Option>(option: Option) => Option[Key],
  value: string | undefined
): A11ySelectOption<Option> | undefined => {
  if (!value) {
    return undefined;
  }

  const findSelectedOption = options.find(
    option => getOptionId(option) === value
  );

  return mapValueToSelectedOption(findSelectedOption);
};
