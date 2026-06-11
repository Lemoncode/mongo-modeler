import classes from './delete-table.module.css'

interface Props {
    onConfirm: () => void;
    onCancel: () => void;
}

export const DeleteTableDialog = ({ onConfirm, onCancel }: Props) => (
  <div role="alertdialog" aria-modal="true">
    <p className={classes.menssage}>You have unsaved changes. Are you sure you want to delete the table? The content of the table will be lost.</p>
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