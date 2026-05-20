export type BaseA11yOption<Option> = Option & {
  tabIndex: number;
};

export type NestedOption<Option> = {
  id: string;
  children?: Option[];
};

export type FlatOption<Option extends NestedOption<Option>> = Omit<
  Option,
  'children'
> & {
  parentId?: string;
};
