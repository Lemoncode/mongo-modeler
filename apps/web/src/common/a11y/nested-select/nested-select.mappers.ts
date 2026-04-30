import { NestedOption, FlatOption } from '../common.model';
import { A11yNestedSelectOption } from './nested-select.model';
import { A11ySelectOption } from '../select';

export const mapNestedSelectOptionsToFlatOptions = <
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
      isSelectable: !Array.isArray(children) || children.length === 0,
    };
    return [
      ...acc,
      flatOption,
      ...(children
        ? mapNestedSelectOptionsToFlatOptions(children, option.id)
        : []),
    ];
  }, []);
};

export const mapFlatOptionsToNestedSelectOptions = <
  Option extends NestedOption<Option>,
>(
  flatOptions: A11ySelectOption<FlatOption<Option>>[]
): A11yNestedSelectOption<Option>[] => {
  const map = new Map<string, any>();
  flatOptions.forEach(flatOption => {
    const { parentId, tabIndex, id, isSelectable, ...option } = flatOption;
    map.set(id, { ...option, id, tabIndex, isSelectable, children: undefined });
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
