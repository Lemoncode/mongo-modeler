import React from 'react';
import { exportStylesVariables } from '../../../export-variables.const';

interface Props {
  width: number;
  height: number;
}

export const DatabaseNoteBorder: React.FC<Props> = props => {
  const { width, height } = props;
  return (
    <rect
      x="0"
      y="0"
      width={width}
      height={height}
      style={{
        fill: 'none',
        stroke: `${exportStylesVariables.NOTE_BORDER}`,
        strokeWidth: 1,
      }}
    />
  );
};
