import { Tick } from '../../icons/tick-icon.component';
import { OptionVm } from '../table-picker.model';
import classes from '../table-pk-picker.component.module.css';

export const generateOptions = (
  options: OptionVm[],
  parentPath = '',
  handleSelectPKField: (
    option: OptionVm,
    parentPath: string,
    index: string
  ) => void,
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
              name="nestedRadio"
              value={option.id}
              onClick={() => handleSelectPKField(option, parentPath, option.id)}
            />
            {option.label}
          </label>
        </>
      )}
    </li>
  ));
};
