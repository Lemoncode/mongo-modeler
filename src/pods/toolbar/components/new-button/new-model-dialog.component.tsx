interface Props {
    onConfirm: () => void;
    onCancel: () => void;
}

export const NewModelDialog = ({ onConfirm, onCancel }: Props) => (
  <div role="alertdialog" aria-modal="true">
    <p>You have unsaved changes. Are you sure you want to create a new model? All current progress will be lost.</p>
    <div>
      <button onClick={onCancel}>Cancel</button>
      <button onClick={onConfirm}>Confirm</button>
    </div>
  </div>
);