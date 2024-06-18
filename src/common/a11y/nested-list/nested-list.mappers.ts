import { FlatOption, NestedOption } from '../common.model';
import { A11yNestedListOption } from './nested-list.model';

export const mapNestedListOptionsToFlatOptions = <
  Option extends NestedOption<Option>,
>(
  options: Option[],
  parentId?: string
): FlatOption<Option>[] => {
  return options.reduce<FlatOption<Option>[]>((acc, o) => {
    const { children, ...option } = o;
    const flatOption: FlatOption<Option> = {
      ...option,
      parentId,
    };
    return [
      ...acc,
      flatOption,
      ...(children
        ? mapNestedListOptionsToFlatOptions(children, option.id)
        : []),
    ];
  }, []);
};

export const mapFlatOptionsToNestedListOptions = <
  Option extends NestedOption<Option>,
>(
  flatOptions: A11yNestedListOption<FlatOption<Option>>[]
): A11yNestedListOption<Option>[] => {
  const map = new Map<string, any>();
  flatOptions.forEach(flatOption => {
    const { parentId, tabIndex, id, ...option } = flatOption;
    map.set(id, { ...option, id, tabIndex, children: undefined });
  });

  const rootIds = new Set(map.keys());

  flatOptions.forEach(flatOption => {
    const { parentId, id } = flatOption;
    const parent = map.get(parentId!);
    const child = map.get(id);
    if (parent && child) {
      if (parent.children === undefined) {
        parent.children = [];
      }
      parent.children.push(child);
      rootIds.delete(id);
    }
  });

  return Array.from(rootIds).map(id => map.get(id));
};
