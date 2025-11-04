import { ActionButton } from '@/common/components/action-button';
import classes from '../floating-bar-components.module.css';
import { NoteIcon } from '@/common/components/icons/note-icon.component';

export const AddNote = () => {
  const handleAddNoteClick = () => {
    console.log('Modal open');
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
