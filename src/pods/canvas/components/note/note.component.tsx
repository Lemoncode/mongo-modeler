import { GUID, Size } from '@/core/model';
import { NOTE_CONST, NoteVm, UpdatePositionFn } from '@/core/providers';
import React from 'react';
import { useDraggable } from '@/common/canvas-draggable';
import { NoteBody, NoteBorder, NoteTitle } from './components';
import classes from './note.module.css';
import { NOTE_COMPONENT_CONST } from './note.const';
import { calculateNoteAutoHeight } from './note.business';

interface Props {
  noteInfo: NoteVm;
  updatePosition: UpdatePositionFn;
  onEditNote: (note: NoteVm) => void;
  canvasSize: Size;
  isSelected: boolean;
  selectNote: (noteId: GUID) => void;
  isTabletOrMobileDevice: boolean;
  viewBoxSize: Size;
  zoomFactor: number;
}

export const Note: React.FC<Props> = props => {
  const {
    noteInfo,
    updatePosition,
    onEditNote,
    canvasSize,
    isSelected,
    selectNote,
    isTabletOrMobileDevice,
    viewBoxSize,
    zoomFactor,
  } = props;

  const noteWidth = noteInfo.width ?? NOTE_CONST.DEFAULT_NOTE_WIDTH;
  const noteHeight = calculateNoteAutoHeight(noteInfo.description, noteWidth);

  const bodyHeight = noteHeight - NOTE_COMPONENT_CONST.TITLE_HEIGHT;

  const { onMouseDown, onTouchStart, ref } = useDraggable(
    noteInfo.id,
    noteInfo.x,
    noteInfo.y,
    updatePosition,
    noteHeight,
    canvasSize,
    viewBoxSize,
    zoomFactor
  );

  const handleSelectNote = () => {
    if (!isSelected) {
      selectNote(noteInfo.id);
    }
  };

  const handleDoubleClick = () => {
    onEditNote(noteInfo);
  };

  return (
    <g
      transform={`translate(${noteInfo.x}, ${noteInfo.y})`}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      className={classes.noteContainer}
      ref={ref as React.LegacyRef<SVGGElement> | undefined}
    >
      {/* Border */}
      <NoteBorder
        width={noteWidth}
        height={noteHeight}
        isSelected={isSelected}
      />

      {/* Title */}
      <NoteTitle
        title={noteInfo.title}
        onEditNote={handleDoubleClick}
        onSelectNote={handleSelectNote}
        isSelected={isSelected}
        width={noteWidth}
        isTabletOrMobileDevice={isTabletOrMobileDevice}
      />

      {/* Body */}
      <NoteBody
        description={noteInfo.description}
        width={noteWidth}
        height={bodyHeight}
      />
    </g>
  );
};
