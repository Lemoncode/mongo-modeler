import { Tick } from '../../icons/tick-icon.component';
import { PkOptionVm } from '../table-pk-picker.model';
import classes from '../table-pk-picker.component.module.css';
import { Field } from 'formik';

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
    <li key={option.id}>
      <div className={classes.svg}>
        {selectedPKField === option.id ? <Tick /> : ''}
      </div>
      {option.children && option.children.length > 0 ? (
        <>
          <span>{option.label}</span>
          <ul>
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
          </ul>
        </>
      ) : (
        <>
          <label>
            <input
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
