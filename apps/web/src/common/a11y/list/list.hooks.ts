import React from 'react';
import { BaseA11yOption } from '../common.model';
import { getArrowDownIndex, getArrowUpIndex } from '../focus.common-helpers';
import { useOnKey } from '../on-key.hook';
import { onFocusOption, setInitialFocus } from './focus.helpers';
import { SetInitialFocusFn } from './list.model';
import { useOnTwoKeys } from '../on-two-Keys.hook';

export const useA11yList = <Option, A11yOption extends BaseA11yOption<Option>>(
  options: Option[],
  onSetInitialFocus: SetInitialFocusFn<Option, A11yOption> = setInitialFocus
) => {
  const optionListRef = React.useRef<any>(null);
  const [internalOptions, setInternalOptions] = React.useState<A11yOption[]>(
    onSetInitialFocus(options)
  );

  const handleFocus = (event: KeyboardEvent) => {
    const currentIndex = internalOptions.findIndex(
      option => option.tabIndex === 0
    );
    const nextIndex =
      event.key === 'ArrowUp'
        ? getArrowUpIndex(currentIndex)
        : getArrowDownIndex(currentIndex, internalOptions);

    if (currentIndex !== nextIndex) {
      setInternalOptions(prevOptions =>
        prevOptions.map((option, index) => {
          switch (index) {
            case currentIndex:
              return {
                ...option,
                tabIndex: -1,
              };
            case nextIndex:
              return {
                ...option,
                tabIndex: 0,
              };
            default:
              return option;
          }
        })
      );
    }
  };

  const handleFirstAndLast = (value: number) => {
    setInternalOptions(prevOptions =>
      prevOptions.map((option, index) => {
        switch (index) {
          case value:
            return {
              ...option,
              tabIndex: 0,
            };
          default:
            return {
              ...option,
              tabIndex: -1,
            };
        }
      })
    );
  };

  //Need this for Mac users
  useOnTwoKeys(
    optionListRef,
    ['ArrowUp', 'ArrowDown'],
    'Meta',
    (event: KeyboardEvent) =>
      event.key === 'ArrowUp'
        ? handleFirstAndLast(0)
        : handleFirstAndLast(internalOptions.length - 1)
  );

  useOnKey(optionListRef, ['ArrowDown', 'ArrowUp'], (event: KeyboardEvent) => {
    handleFocus(event);
  });

  useOnKey(optionListRef, ['Home', 'End'], (event: KeyboardEvent) =>
    event.key === 'Home'
      ? handleFirstAndLast(0)
      : handleFirstAndLast(internalOptions.length - 1)
  );

  return {
    optionListRef,
    options: internalOptions,
    setOptions: setInternalOptions,
    onFocusOption,
  };
};
