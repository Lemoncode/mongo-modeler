import { Tick } from '../../icons/tick-icon.component';
import { PkOptionVm } from '../table-pk-picker.model';
import classes from '../table-pk-picker.component.module.css';
import { Field } from 'formik';

// TODO:
// #116 Add unit test support to fieldTreeBusiness
//https://github.com/Lemoncode/mongo-modeler/issues/116
export const generateOptions = (
  name: string,
  options: PkOptionVm[],
  parentPath: string,
  handleSelectPKField: (option: PkOptionVm, parentPath: string) => void,
  selectedPKField?: string
): JSX.Element[] => {
  return options.map(option => (
    <li key={option.id}>
      <div className={classes.svg}>
        {selectedPKField === option.id ? <Tick /> : ''}
      </div>
      {option.children && option.children.length > 0 ? (
        <>
          <span>{option.label}</span>
          <ul>
            {generateOptions(
              name,
              option.children,
              parentPath
                ? `${parentPath} > ${option.label}`
                : `${option.label}`,
              handleSelectPKField,
              selectedPKField
            )}
          </ul>
        </>
      ) : (
        <>
          <label>
            <Field
              type="radio"
              name={name}
              value={option.id}
              onClick={() => handleSelectPKField(option, parentPath)}
            />
            {option.label}
          </label>
        </>
      )}
    </li>
  ));
};
