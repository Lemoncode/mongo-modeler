import {
  mapFlatOptionsToNestedListOptions,
  mapNestedListOptionsToFlatOptions,
} from './nested-list.mappers';
import { NestedOption } from '../common.model';
import { useA11yNested } from '../nested.hooks';
import { useA11yList } from '../list';

export const useA11yNestedList = <Option extends NestedOption<Option>>(
  options: Option[]
) => {
  const flatOptions = mapNestedListOptionsToFlatOptions(options);

  const {
    optionListRef,
    options: internalOptions,
    setOptions,
    onFocusOption,
  } = useA11yList(flatOptions);

  useA11yNested(optionListRef, internalOptions, setOptions);

  return {
    optionListRef,
    options: mapFlatOptionsToNestedListOptions(internalOptions),
    setOptions,
    onFocusOption,
  };
};
