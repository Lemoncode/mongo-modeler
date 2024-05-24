export type A11ySelectOption<Option> = Option & {
  tabIndex: number;
  isSelectable: boolean;
};
