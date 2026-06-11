import classes from './new-model.module.css'

interface Props {
    onConfirm: () => void;
    onCancel: () => void;
}

export const NewModelDialog = ({ onConfirm, onCancel }: Props) => (
  <div role="alertdialog" aria-modal="true">
    <p className={classes.menssage}>You have unsaved changes. Are you sure you want to create a new model? All current progress will be lost.</p>
    <div className="two-buttons" >
        <button
            className="button-secondary"
            onClick={onConfirm}>
            Confirm
        </button>
        <button
            className="button-tertiary"
            onClick={onCancel}>
            Cancel
        </button>
    </div>
  </div>
);