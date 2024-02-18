import React from 'react';
import useShortcut from '../../shortcut/shortcut.hook';
import { isMacOS } from '@/common/helpers/platform.helpers';
import { ShortcutOptions } from '../../shortcut/shortcut.model';

interface Props {
  icon?: React.ReactNode;
  label: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  shortcutOptions?: ShortcutOptions;
}

export const ToolbarButton: React.FC<Props> = ({
  disabled,
  icon,
  onClick = () => {},
  className,
  label,
  shortcutOptions,
}) => {
  const shortcutCommand = isMacOS() ? 'Ctrl' : 'Alt';
  const showTooltip = shortcutOptions && !disabled;
  const tooltipText = `(${shortcutCommand} + ${shortcutOptions?.targetKeyLabel})`;

  useShortcut({
    ...shortcutOptions,
    targetKey: shortcutOptions?.targetKey || [],
    callback: onClick,
  });

  return (
    <button
      className={className}
      onClick={onClick}
      disabled={disabled === true}
      aria-describedby={shortcutOptions?.id}
    >
      {icon}
      <span>{label}</span>
      {showTooltip && (
        <span role="tooltip" id={shortcutOptions?.id}>
          {tooltipText}
        </span>
      )}
    </button>
  );
};
