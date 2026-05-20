import { useState } from 'react';
import { createDefaultNote, NoteVm } from './edit-note.vm';
import { EditNoteComponent } from './edit-note.component';

interface Props {
  note?: NoteVm;
  onSave: (note: NoteVm) => void;
  onClose: () => void;
}

export const EditNotePod: React.FC<Props> = props => {
  const { note, onSave, onClose } = props;

  const [editNote, setEditNote] = useState<NoteVm>(
    () => note || createDefaultNote()
  );

  const [hasError, setHasError] = useState(false);

  const updateTitle = (title: string) => {
    setEditNote(prev => ({ ...prev, title }));
  };

  const updateDescription = (description: string) => {
    setEditNote(prev => ({ ...prev, description }));
    if (hasError && description.trim()) {
      setHasError(false);
    }
  };

  const handleSubmit = () => {
    if (!editNote.description.trim()) {
      setHasError(true);
      return;
    }
    onSave(editNote);
  };

  return (
    <>
      <EditNoteComponent
        note={editNote}
        updateTitle={updateTitle}
        updateDescription={updateDescription}
        hasError={hasError}
      />
      <div className="two-buttons">
        <button className="button-secondary" onClick={handleSubmit}>
          Apply
        </button>
        <button className="button-tertiary" onClick={onClose}>
          Cancel
        </button>
      </div>
    </>
  );
};
