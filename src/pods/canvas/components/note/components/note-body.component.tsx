import React from 'react';
import { NOTE_COMPONENT_CONST } from '../note.const';
import classes from '../note.module.css';

interface Props {
  description: string;
  width: number;
  height: number;
}

export const NoteBody: React.FC<Props> = props => {
  const { description, width, height } = props;
  return (
    <g>
      <rect
        x="0"
        y={NOTE_COMPONENT_CONST.TITLE_HEIGHT}
        width={width}
        height={height}
        className={classes.noteBody}
      />
      <foreignObject
        x={NOTE_COMPONENT_CONST.PADDING_X}
        y={NOTE_COMPONENT_CONST.TITLE_HEIGHT + NOTE_COMPONENT_CONST.PADDING_Y}
        width={width - NOTE_COMPONENT_CONST.PADDING_X * 2}
        height={height - NOTE_COMPONENT_CONST.PADDING_Y * 2}
      >
        <div className={classes.noteBodyText}>{description}</div>
      </foreignObject>
    </g>
  );
};
