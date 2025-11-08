import { ActionButton } from '@/common/components/action-button';
import classes from '../floating-bar-components.module.css';
import { NoteIcon } from '@/common/components/icons/note-icon.component';
import {
  NoteVm,
  useCanvasSchemaContext,
  useCanvasViewSettingsContext,
  useModalDialogContext,
} from '@/core/providers';
import { EditNotePod } from '@/pods/edit-note';
import { ADD_NOTE_TITLE } from '@/common/components';

const BORDER_MARGIN = 40;

export const AddNote = () => {
  const { openModal, closeModal } = useModalDialogContext();
  const { addNote } = useCanvasSchemaContext();
  const { canvasViewSettings, setLoadSample } = useCanvasViewSettingsContext();

  const handleAddNote = (newNote: NoteVm) => {
    const updatedNote = {
      ...newNote,
      x: canvasViewSettings.scrollPosition.x + BORDER_MARGIN,
      y: canvasViewSettings.scrollPosition.y + BORDER_MARGIN,
    };

    addNote(updatedNote);
    closeModal();
  };

  const handleAddNoteClick = () => {
    setLoadSample(false);
    openModal(
      <EditNotePod onSave={handleAddNote} onClose={closeModal} />,
      ADD_NOTE_TITLE
    );
  };
  return (
    <ActionButton
      icon={<NoteIcon />}
      label="Add Note"
      onClick={handleAddNoteClick}
      className={`${classes.button} hide-mobile add-note-button`}
      showLabel={false}
      tooltipPosition="top"
    />
  );
};
