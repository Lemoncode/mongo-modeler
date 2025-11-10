import { NoteVm } from './edit-note.vm';
import classes from './edit-note.module.css';

interface Props {
  note: NoteVm;
  updateTitle: (value: string) => void;
  updateDescription: (value: string) => void;
}

export const EditNoteComponent: React.FC<Props> = props => {
  const { note, updateTitle, updateDescription } = props;

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateTitle(e.currentTarget.value);
  };

  const handleChangeDescription = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    updateDescription(e.currentTarget.value);
  };

  return (
    <div className={classes.noteForm}>
      <div className={classes.formField}>
        <label>
          Title:
          <input
            type="text"
            value={note.title ?? ''}
            onChange={handleChangeTitle}
            placeholder="Enter note title"
            onFocus={e => e.currentTarget.select()}
          />
        </label>
      </div>

      <div className={classes.formField}>
        <label>
          Description:
          <textarea
            value={note.description}
            onChange={handleChangeDescription}
            placeholder="Enter note description"
            required
            rows={5}
            onFocus={e => e.currentTarget.select()}
          />
        </label>
      </div>
    </div>
  );
};
