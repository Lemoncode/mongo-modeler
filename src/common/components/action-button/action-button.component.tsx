import React from 'react';
import { isMacOS } from '@/common/helpers/platform.helpers';
import classes from './action-button.component.module.css';
import { ShortcutOptions } from '@/common/shortcut';
import useShortcut from '@/common/shortcut/shortcut.hook';

interface Props {
  icon?: React.ReactNode;
  label: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  shortcutOptions?: ShortcutOptions;
  showLabel?: boolean;
  tooltipPosition?: 'top' | 'bottom';
}

export const ActionButton: React.FC<Props> = ({
  disabled,
  icon,
  onClick = () => {},
  className,
  label,
  shortcutOptions,
  showLabel = true,
  tooltipPosition = 'bottom',
}) => {
  const shortcutCommand = isMacOS() ? 'Ctrl' : 'Alt';
  const showTooltip = shortcutOptions && !disabled;
  const tooltipText = `(${shortcutCommand} + ${shortcutOptions?.targetKeyLabel})`;

  const tooltipPositionClass =
    tooltipPosition === 'top' ? classes.tooltipTop : classes.tooltipBottom;

  const tooltipClasses = `${classes.tooltip} ${tooltipPositionClass}`;

  const buttonClasses = className
    ? `${classes.button} ${className}`.trim()
    : classes.button;

  useShortcut({
    ...shortcutOptions,
    targetKey: shortcutOptions?.targetKey || [],
    callback: onClick,
  });

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled === true}
      aria-describedby={shortcutOptions?.id}
    >
      <span aria-hidden={true}>{icon}</span>
      {showLabel && <span>{label}</span>}
      {showTooltip && (
        <span
          className={tooltipClasses}
          role="tooltip"
          id={shortcutOptions?.id}
        >
          {tooltipText}
        </span>
      )}
    </button>
  );
};
