import { Tick } from '../../icons/tick-icon.component';
import { PkOptionVm } from '../table-pk-picker.model';
import classes from '../table-pk-picker.component.module.css';
import React from 'react';
// TODO:
// #116 Add unit test support to fieldTreeBusiness
//https://github.com/Lemoncode/mongo-modeler/issues/116

interface Props {
  name: string;
  options: PkOptionVm[];
  parentPath: string;
  handleSelectPKField: (option: PkOptionVm, parentPath: string) => void;
  selectedPKField?: string;
}
export const GenerateOptions: React.FC<Props> = props => {
  const { name, options, parentPath, handleSelectPKField, selectedPKField } =
    props;
  return options.map(option => (
    <React.Fragment key={option.id}>
      {option.children && option.children.length > 0 ? (
        <>
          <li
            role="textbox"
            aria-disabled="true"
            className={classes.liDisabled}
          >
            {option.label}
          </li>
          <div
            role="listbox"
            aria-label={`nested fields of ${option.label}`}
            className={classes.liGroup}
          >
            <GenerateOptions
              name={name}
              options={option.children}
              parentPath={
                parentPath
                  ? `${parentPath} > ${option.label}`
                  : `${option.label}`
              }
              handleSelectPKField={handleSelectPKField}
              selectedPKField={selectedPKField}
            />
          </div>
        </>
      ) : (
        <>
          <li
            onClick={() => handleSelectPKField(option, parentPath)}
            role="option"
            aria-selected={selectedPKField === option.id}
            id={`${name}-option-${option.id}`}
          >
            {option.label}
            <div className={classes.svg}>
              {selectedPKField === option.id ? <Tick /> : ''}
            </div>
          </li>
        </>
      )}
    </React.Fragment>
  ));
};
