import { NestedOption } from '../common.model';

export type A11yNestedSelectOption<Option extends NestedOption<Option>> = Omit<
  Option,
  'children'
> & {
  tabIndex: number;
  isSelectable: boolean;
  children?: A11yNestedSelectOption<Option>[];
};
