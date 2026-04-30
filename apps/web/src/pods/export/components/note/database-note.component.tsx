import { NOTE_CONST, NoteVm } from '@/core/providers';
import {
  calculateNoteAutoHeight,
  NOTE_COMPONENT_CONST,
} from '@/pods/canvas/components/note';
import React from 'react';

import {
  DatabaseNoteBody,
  DatabaseNoteBorder,
  DatabaseNoteTitle,
} from './components';

interface Props {
  noteInfo: NoteVm;
}

export const DatabaseNote: React.FC<Props> = ({ noteInfo }) => {
  const noteWidth = noteInfo.width ?? NOTE_CONST.DEFAULT_NOTE_WIDTH;
  const totalNoteHeight = calculateNoteAutoHeight(
    noteInfo.description,
    noteWidth
  );
  const bodyHeight =
    totalNoteHeight - NOTE_COMPONENT_CONST.TITLE_CONTAINER_HEIGHT;

  return (
    <g transform={`translate(${noteInfo.x}, ${noteInfo.y})`}>
      <DatabaseNoteBorder width={noteWidth} height={totalNoteHeight} />
      <DatabaseNoteTitle title={noteInfo.title} width={noteWidth} />
      <DatabaseNoteBody
        description={noteInfo.description}
        width={noteWidth}
        height={bodyHeight}
      />
    </g>
  );
};
