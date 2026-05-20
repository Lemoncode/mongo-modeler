import { NestedOption } from '../common.model';

export type A11yNestedListOption<Option extends NestedOption<Option>> = Omit<
  Option,
  'children'
> & {
  tabIndex: number;
  children?: A11yNestedListOption<Option>[];
};
