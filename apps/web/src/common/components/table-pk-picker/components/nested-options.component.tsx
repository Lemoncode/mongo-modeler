import { A11yNestedSelectOption } from '@/common/a11y';
import { PkOptionVm } from '../table-pk-picker.model';
import { Tick } from '../../icons/tick-icon.component';
import classes from '../table-pk-picker.component.module.css';

interface Props {
  option: A11yNestedSelectOption<PkOptionVm>;
  selectedOption: string | undefined;
  onFocusOption: (
    option: A11yNestedSelectOption<PkOptionVm>
  ) => (element: any) => void;
  onOptionClick: (id: string) => void;
}

export const NestedOptions: React.FC<Props> = props => {
  const { option, selectedOption, onOptionClick, onFocusOption } = props;

  return (
    <li
      key={option.id}
      id={option.id}
      role="treeitem"
      aria-expanded="true"
      aria-disabled="true"
      aria-selected="false"
      tabIndex={option.tabIndex}
      ref={onFocusOption(option)}
      onClick={e => {
        e.stopPropagation();
        onOptionClick('');
      }}
    >
      {option.label}
      <ul role="group" className={classes.liGroup}>
        {option.children?.map(child => {
          return child.children ? (
            <NestedOptions
              onOptionClick={onOptionClick}
              option={child}
              selectedOption={selectedOption}
              key={child.id}
              onFocusOption={onFocusOption}
            ></NestedOptions>
          ) : (
            <li
              key={child.id}
              id={child.id}
              role="treeitem"
              tabIndex={child.tabIndex}
              aria-selected={selectedOption === child.id}
              aria-disabled={!child.isSelectable}
              onClick={e => {
                e.stopPropagation();
                onOptionClick(child.id);
              }}
              ref={onFocusOption(child)}
            >
              <div className={classes.svg} aria-hidden="true">
                {selectedOption === child.id ? <Tick /> : ''}
              </div>
              {child.label}
            </li>
          );
        })}
      </ul>
    </li>
  );
};
