import { useA11ySelect } from '../select';
import { useA11yNested } from '../nested.hooks';
import { NestedOption, FlatOption } from '../common.model';
import {
  mapNestedSelectOptionsToFlatOptions,
  mapFlatOptionsToNestedSelectOptions,
} from './nested-select.mappers';

export const useA11yNestedSelect = <Option extends NestedOption<Option>>(
  options: Option[],
  getOptionId: <Key extends keyof FlatOption<Option>>(
    option: FlatOption<Option>
  ) => FlatOption<Option>[Key],
  initialOption?: Option,
  onChangeOption?: (option: FlatOption<Option> | undefined) => void
) => {
  const flatOptions = mapNestedSelectOptionsToFlatOptions(options);

  const {
    optionListRef,
    buttonRef,
    veilRef,
    isOpen,
    setIsOpen,
    options: internalOptions,
    setOptions,
    selectedOption,
    setSelectedOption,
    onFocusOption,
  } = useA11ySelect(flatOptions, getOptionId, initialOption, onChangeOption);

  useA11yNested(optionListRef, internalOptions, setOptions);

  return {
    optionListRef,
    buttonRef,
    veilRef,
    options: mapFlatOptionsToNestedSelectOptions(internalOptions),
    setOptions,
    isOpen,
    setIsOpen,
    selectedOption,
    setSelectedOption,
    onFocusOption,
  };
};
