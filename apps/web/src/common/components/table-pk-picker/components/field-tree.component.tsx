import React from 'react';
import { PkOptionVm } from '../table-pk-picker.model';
import classes from '../table-pk-picker.component.module.css';
import { GenerateOptions } from './generate-options.component';
import { A11yNestedSelectOption } from '@/common/a11y';

interface Props {
  name: string;
  options: A11yNestedSelectOption<PkOptionVm>[];
  selectedOption: string | undefined;
  onOptionClick: (id: string) => void;
  onFocusOption: (
    option: A11yNestedSelectOption<PkOptionVm>
  ) => (element: any) => void;
}

export const FieldTree = React.forwardRef((props: Props, ref) => {
  const { name, options, selectedOption, onFocusOption, onOptionClick } = props;

  return (
    <ul
      className={classes.options}
      role="tree"
      ref={ref as React.Ref<HTMLUListElement>}
      onClick={e => e.stopPropagation()}
      id={`${name}-select`}
      aria-labelledby={name}
      tabIndex={-1}
    >
      <GenerateOptions
        options={options}
        onOptionClick={onOptionClick}
        onFocusOption={onFocusOption}
        selectedOption={selectedOption}
      />
    </ul>
  );
});
