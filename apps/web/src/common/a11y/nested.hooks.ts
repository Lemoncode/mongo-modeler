import React from 'react';
import { NestedOption, FlatOption, BaseA11yOption } from './common.model';
import { useOnKey } from './on-key.hook';

export const useA11yNested = <
  Option extends NestedOption<Option>,
  A11yFlatOption extends BaseA11yOption<FlatOption<Option>>,
>(
  optionListRef: React.RefObject<HTMLElement>,
  flatOptions: A11yFlatOption[],
  setOptions: React.Dispatch<React.SetStateAction<A11yFlatOption[]>>
) => {
  const updateFocus = (id: Option['id'] | undefined) => {
    if (id) {
      setOptions(
        flatOptions.map(option => {
          return {
            ...option,
            tabIndex: option.id === id ? 0 : -1,
          };
        })
      );
    }
  };

  useOnKey(optionListRef, ['ArrowRight'], () => {
    //If have childs, Focus on the first child
    const focusedOption = flatOptions.find(option => option.tabIndex === 0);
    const child = flatOptions.find(
      option => option.parentId === focusedOption?.id
    );
    updateFocus(child?.id);
  });

  useOnKey(optionListRef, ['ArrowLeft'], () => {
    //If have parent, Focus on the parent
    const focusedOption = flatOptions.find(option => option.tabIndex === 0);
    const parent = flatOptions.find(
      option => option.id === focusedOption?.parentId
    );
    updateFocus(parent?.id);
  });
};
