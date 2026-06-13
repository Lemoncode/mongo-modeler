import classes from './edit-table.module.css'

interface Props {
    onConfirm: () => void;
    onCancel: () => void;
}

export const EditModelDialog = ({ onConfirm, onCancel }: Props) => (
  <div role="alertdialog" aria-modal="true">
    <p className={classes.menssage}>This field has nested fields. Are you sure you want to delete it?</p>
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