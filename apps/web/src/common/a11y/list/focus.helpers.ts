import { BaseA11yOption } from '../common.model';

export const setInitialFocus = <
  Option,
  A11yOption extends BaseA11yOption<Option>,
>(
  options: Option[]
): A11yOption[] => {
  const a11ySelectionOptions = options.map<A11yOption>(
    (option, index) =>
      ({
        ...option,
        tabIndex: index === 0 ? 0 : -1,
      }) as unknown as A11yOption
  );

  return a11ySelectionOptions;
};

export const onFocusOption =
  <Option>(option: BaseA11yOption<Option>) =>
  (element: any) => {
    if (option.tabIndex === 0) {
      element?.focus();
    }
  };
