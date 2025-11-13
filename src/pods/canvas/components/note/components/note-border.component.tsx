import React from 'react';
import classes from '../note.module.css';

interface Props {
  width: number;
  height: number;
  isSelected: boolean;
}

export const NoteBorder: React.FC<Props> = props => {
  const { width, height, isSelected } = props;

  return (
    <rect
      x="0"
      y="0"
      width={width}
      height={height}
      className={isSelected ? classes.noteBorderSelected : classes.noteBorder}
    />
  );
};
