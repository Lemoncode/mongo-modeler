import { GenerateGUID, GUID } from '@/core/model';
import { NOTE_CONST } from '@/core/providers';

export interface NoteVm {
  id: GUID;
  title: string;
  description: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export const createDefaultNote = (): NoteVm => ({
  id: GenerateGUID(),
  title: 'New note',
  description: 'Note description is required',
  x: 0,
  y: 0,
  width: NOTE_CONST.DEFAULT_NOTE_WIDTH,
  height: NOTE_CONST.DEFAULT_NOTE_HEIGHT,
});
