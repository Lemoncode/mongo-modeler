import React from 'react';
import { NOTE_COMPONENT_CONST } from '../note.const';
import classes from '../note.module.css';
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
        height={NOTE_COMPONENT_CONST.TITLE_CONTAINER_HEIGHT}
        className={classes.noteTitleContainer}
      />

      <foreignObject
        x={NOTE_COMPONENT_CONST.PADDING_X}
        y={NOTE_COMPONENT_CONST.PADDING_Y}
        width={
          width -
          NOTE_COMPONENT_CONST.PENCIL_ICON_WIDTH -
          NOTE_COMPONENT_CONST.PENCIL_MARGIN_RIGHT -
          NOTE_COMPONENT_CONST.PADDING_X * 2
        }
        height={NOTE_COMPONENT_CONST.TITLE_TEXT_HEIGHT}
      >
        <div className={classes.noteTitle}>{title ?? ''}</div>
      </foreignObject>

      <line
        x1="0"
        y1={NOTE_COMPONENT_CONST.TITLE_CONTAINER_HEIGHT}
        x2={width}
        y2={NOTE_COMPONENT_CONST.TITLE_CONTAINER_HEIGHT}
        stroke="#d1be70"
        strokeWidth="1"
      />
      {isSelected && !isTabletOrMobileDevice && (
        <g
          transform={`translate(${
            width -
            NOTE_COMPONENT_CONST.PENCIL_ICON_WIDTH -
            NOTE_COMPONENT_CONST.PENCIL_MARGIN_RIGHT
          }, 10)`}
          onClick={handlePencilIconClick}
        >
          <rect
            x="0"
            y="0"
            width={NOTE_COMPONENT_CONST.PENCIL_ICON_WIDTH}
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
          isSelected
            ? width -
              NOTE_COMPONENT_CONST.PENCIL_ICON_WIDTH -
              NOTE_COMPONENT_CONST.PADDING_X
            : width
        }
        height={NOTE_COMPONENT_CONST.TITLE_CONTAINER_HEIGHT}
        fill="transparent"
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        style={{ cursor: 'pointer' }}
      />
    </>
  );
};
