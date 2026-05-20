import React from 'react';
import classes from '../note.module.css';

interface Props {
  width: number;
  height: number;
  isSelected: boolean;
}

export const NoteBorder: React.FC<Props> = props => {
  const { width, height, isSelected } = props;

  const rectStyle = {
    filter: isSelected ? 'url(#note_component_selected)' : 'none',
  };

  return (
    <rect
      x="0"
      y="0"
      width={width}
      height={height}
      style={rectStyle}
      className={classes.noteBorder}
    />
  );
};
