import React from 'react';
import classes from './checkbox.component.module.css';
interface Props {
  id: string;
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
  ariaLabelledby?: string;
  ariaLabel?: string;
}

export const Checkbox: React.FC<Props> = props => {
  const { id, onChange, disabled, checked, ariaLabelledby, ariaLabel } = props;

  return (
    <div className={`${classes.checkbox} ${disabled && classes.disabled}`}>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        aria-labelledby={ariaLabelledby}
        aria-label={ariaLabel}
      />
      <div aria-hidden="true">
        <svg viewBox="0,0,50,50">
          <path d="M5 30 L 20 45 L 45 8"></path>
        </svg>
      </div>
    </div>
  );
};
