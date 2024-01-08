import React from 'react';

interface Props {
  icon?: React.ReactNode;
  label: string;
  onClick?: () => void;
  className?: string;
}

export const ToolbarButton: React.FC<Props> = props => {
  return (
    <button className={props.className} onClick={props.onClick}>
      {props.icon}
      <span>{props.label}</span>
    </button>
  );
};
