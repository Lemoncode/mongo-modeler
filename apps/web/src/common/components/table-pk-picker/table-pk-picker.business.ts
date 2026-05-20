import { PkOptionVm } from './table-pk-picker.model';
import {
  A11yNestedSelectOption,
  mapNestedSelectOptionsToFlatOptions,
} from '@/common/a11y';

export const findPath = (
  id: string | undefined,
  optionList: A11yNestedSelectOption<PkOptionVm>[]
) => {
  const flatOptions = mapNestedSelectOptionsToFlatOptions(optionList);
  const path: string[] = [];
  let currentId = id;
  while (currentId) {
    const flatOption = flatOptions.find(
      (option: any) => option.id === currentId
    );
    if (flatOption) {
      path.unshift(flatOption.label);
      currentId = flatOption.parentId;
    } else {
      currentId = undefined;
    }
  }
  return path.join(' > ');
};
