import React from 'react';

interface Props {
  icon?: React.ReactNode;
  label: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export const ToolbarButton: React.FC<Props> = props => {
  const { disabled } = props;
  return (
    <button
      className={props.className}
      onClick={props.onClick}
      disabled={disabled === true}
    >
      {props.icon}
      <span>{props.label}</span>
    </button>
  );
};
