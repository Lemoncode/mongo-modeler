import React from 'react';
import { OptionVm } from '../select-formik.component';
import classes from '../select-formik.component.module.css';
import { Tick } from '../../icons/tick-icon.component';

interface Props {
  options: OptionVm[];
  optionsListVisible: boolean;
  handleOptionClick: (
    option: OptionVm,
    parentPath: string,
    index: string
  ) => void;
  selectedLabel: string;
}

export const SelectFormikList: React.FC<Props> = props => {
  const { options, optionsListVisible, handleOptionClick, selectedLabel } =
    props;

  const generateOptions = (options: OptionVm[], parentPath = '') => {
    return options.map(option => (
      <li key={option.id}>
        <div className={classes.svg}>
          {selectedLabel === option.id ? <Tick /> : ''}
        </div>
        {option.children && option.children.length > 0 ? (
          <>
            <span>{option.label}</span>
            <ul>
              {parentPath
                ? generateOptions(
                    option.children,
                    `${parentPath} > ${option.label}`
                  )
                : generateOptions(option.children, `${option.label}`)}
            </ul>
          </>
        ) : (
          <>
            <label>
              <input
                type="radio"
                name="nestedRadio"
                onClick={() => handleOptionClick(option, parentPath, option.id)}
              />
              {option.label}
            </label>
          </>
        )}
      </li>
    ));
  };

  return (
    <ul
      className={classes.options}
      style={{ display: optionsListVisible ? 'block' : 'none' }}
    >
      {generateOptions(options)}
    </ul>
  );
};
