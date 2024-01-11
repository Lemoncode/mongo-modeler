import { Tick } from '../../icons/tick-icon.component';
import { OptionVm } from '../table-pk-picker.model';
import classes from '../table-pk-picker.component.module.css';

export const generateOptions = (
  name: string,
  options: OptionVm[],
  parentPath: string,
  handleSelectPKField: (option: OptionVm, parentPath: string) => void,
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
