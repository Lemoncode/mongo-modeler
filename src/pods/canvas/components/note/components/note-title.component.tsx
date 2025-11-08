import React from 'react';
import { NOTE_COMPONENT_CONST } from '../note.const';
import classes from '../note.module.css';
import { TruncatedText } from '../../table/components';
import { Edit } from '@/common/components';

interface Props {
  title?: string;
  onEditNote: () => void;
  onSelectNote: () => void;
  isSelected: boolean;
  width: number;
  isTabletOrMobileDevice: boolean;
}

export const NoteTitle: React.FC<Props> = props => {
  const {
    title,
    onEditNote,
    onSelectNote,
    isSelected,
    width,
    isTabletOrMobileDevice,
  } = props;

  const handlePencilIconClick = (
    e: React.MouseEvent<SVGGElement, MouseEvent>
  ) => {
    onEditNote();
    e.stopPropagation();
  };

  const handleClick = (e: React.MouseEvent<SVGGElement, MouseEvent>) => {
    onSelectNote();
    e.stopPropagation();
  };

  const handleDoubleClick = (e: React.MouseEvent<SVGGElement, MouseEvent>) => {
    onEditNote();
    e.stopPropagation();
  };

  return (
    <>
      <rect
        x="0"
        y="0"
        width={width}
        height={NOTE_COMPONENT_CONST.TITLE_HEIGHT}
        className={classes.noteTitle}
      />

      <TruncatedText
        text={title ?? ''}
        x={NOTE_COMPONENT_CONST.PADDING_X}
        y={-5}
        width={
          width -
          NOTE_COMPONENT_CONST.PADDING_X -
          NOTE_COMPONENT_CONST.PENCIL_ICON_WIDTH
        }
        height={NOTE_COMPONENT_CONST.TITLE_HEIGHT - 8}
        textClass={classes.noteText}
      />

      <line
        x1="0"
        y1={NOTE_COMPONENT_CONST.TITLE_HEIGHT}
        x2={width}
        y2={NOTE_COMPONENT_CONST.TITLE_HEIGHT}
        stroke="#d1be70"
        strokeWidth="1"
      />
      {isSelected && !isTabletOrMobileDevice && (
        <g
          transform={`translate(${width - (NOTE_COMPONENT_CONST.PENCIL_ICON_WIDTH - NOTE_COMPONENT_CONST.PENCIL_MARGIN_RIGHT)}, 2)`}
          onClick={handlePencilIconClick}
        >
          <rect
            x="0"
            y="0"
            width={
              NOTE_COMPONENT_CONST.PENCIL_ICON_WIDTH +
              NOTE_COMPONENT_CONST.PENCIL_MARGIN_RIGHT
            }
            fill="transparent"
            height={NOTE_COMPONENT_CONST.PENCIL_ICON_HEIGHT}
            onClick={handlePencilIconClick}
            style={{ cursor: 'pointer' }}
          />
          <g className={classes.editIcon}>
            <Edit />
          </g>
        </g>
      )}
      {/* Clikable area to select the note or edit it*/}
      <rect
        x="0"
        y="0"
        width={
          isSelected ? width - NOTE_COMPONENT_CONST.PENCIL_ICON_WIDTH : width
        }
        height={NOTE_COMPONENT_CONST.TITLE_HEIGHT}
        fill="transparent"
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        style={{ cursor: 'pointer' }}
      />
    </>
  );
};
