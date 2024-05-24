import React from 'react';
import { getFocusedOption } from '../focus.common-helpers';
import { useOnKey } from '../on-key.hook';
import { useClickOutside } from '../click-outside.hook';

import { updateFocusBySelectedOption } from './focus.helpers';
import { useA11yList } from '../list';
import { mapInternalSelectOptionToOption } from './select.mappers';

export const useA11ySelect = <Option>(
  options: Option[],
  getOptionId: <Key extends keyof Option>(option: Option) => Option[Key],
  initialOption?: Option,
  onChangeOption?: (option: Option | undefined) => void
) => {
  const buttonRef = React.useRef<any>(null);
  const veilRef = React.useRef<any>(null);
  const [isOpen, setIsOpen] = React.useState(false);

  const [selectedOption, setSelectedOption] = React.useState<
    Option | undefined
  >(initialOption);

  const {
    optionListRef,
    options: internalOptions,
    setOptions,
    onFocusOption,
  } = useA11yList(
    options,
    updateFocusBySelectedOption(getOptionId, selectedOption)
  );

  const handleSetSelectedOption = (
    selectedOptionId: ReturnType<typeof getOptionId> | undefined
  ) => {
    buttonRef.current?.focus();
    setIsOpen(false);
    const internalSelectedOption = internalOptions.find(
      option => getOptionId(option) === selectedOptionId
    );
    const selectedOption = mapInternalSelectOptionToOption(
      internalSelectedOption
    );
    if (onChangeOption) {
      onChangeOption(selectedOption);
    }
    setSelectedOption(selectedOption);
    setOptions(
      updateFocusBySelectedOption(getOptionId, selectedOption)(internalOptions)
    );
  };

  useOnKey(buttonRef, ['ArrowDown', 'ArrowUp'], () => {
    if (!isOpen) {
      setIsOpen(true);
    }
  });

  useOnKey(optionListRef, ['Escape', 'Tab'], (event: KeyboardEvent) => {
    if (isOpen) {
      event.preventDefault();
      event.stopPropagation();
      if (selectedOption) {
        const id = getOptionId(selectedOption);
        handleSetSelectedOption(id);
      } else {
        buttonRef.current?.focus();
        setIsOpen(false);
      }
    }
  });

  useOnKey(optionListRef, [' ', 'Enter'], (event: KeyboardEvent) => {
    if (isOpen) {
      event.preventDefault();
      const focusedOption = getFocusedOption(internalOptions);
      if (focusedOption && focusedOption.isSelectable) {
        const id = getOptionId(focusedOption);
        handleSetSelectedOption(id);
      } else {
        handleSetSelectedOption(undefined);
      }
    }
  });

  const handleClickOutside = () => {
    if (isOpen) {
      buttonRef.current?.focus();
      setIsOpen(false);
    }
  };

  useClickOutside(isOpen, veilRef, handleClickOutside);

  return {
    optionListRef,
    buttonRef,
    veilRef,
    isOpen,
    setIsOpen,
    options: internalOptions,
    setOptions,
    selectedOption,
    setSelectedOption: handleSetSelectedOption,
    onFocusOption,
  };
};
