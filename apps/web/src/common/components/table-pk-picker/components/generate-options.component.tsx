import { Tick } from '../../icons/tick-icon.component';
import { PkOptionVm } from '../table-pk-picker.model';
import classes from '../table-pk-picker.component.module.css';
import React from 'react';
import { A11yNestedSelectOption } from '@/common/a11y';
import { NestedOptions } from './nested-options.component';
// TODO:
// #116 Add unit test support to fieldTreeBusiness
//https://github.com/Lemoncode/mongo-modeler/issues/116

interface Props {
  options: A11yNestedSelectOption<PkOptionVm>[];
  selectedOption: string | undefined;
  onOptionClick: (id: string) => void;
  onFocusOption: (
    option: A11yNestedSelectOption<PkOptionVm>
  ) => (element: any) => void;
}
export const GenerateOptions: React.FC<Props> = props => {
  const { options, selectedOption, onFocusOption, onOptionClick } = props;

  return options.map(option => {
    return option.children ? (
      <NestedOptions
        onOptionClick={onOptionClick}
        option={option}
        selectedOption={selectedOption}
        onFocusOption={onFocusOption}
        key={option.id}
      ></NestedOptions>
    ) : (
      <li
        key={option.id}
        id={option.id}
        role="treeitem"
        tabIndex={option.tabIndex}
        aria-selected={selectedOption === option.id}
        onClick={() => onOptionClick(option.id)}
        ref={onFocusOption(option)}
      >
        <div className={classes.svg} aria-hidden="true">
          {selectedOption === option.id ? <Tick /> : ''}
        </div>
        {option.label}
      </li>
    );
  });
};
