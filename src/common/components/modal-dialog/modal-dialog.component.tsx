import React from 'react';
import styles from './modal-dialog.styles.module.css';
import { useModalDialogContext } from '@/core/providers/modal-dialog-provider';

export const ModalDialog: React.FC = () => {
  const { closeModal, modalDialog } = useModalDialogContext();
  const handleClick = () => {
    closeModal();
  };

  return (
    modalDialog.isOpen && (
      <div
        className={styles.container}
        style={modalDialog.maximize ? { width: '90%', height: '90%' } : {}}
        role="presentation"
      >
        <div className={styles.dialog} role="dialog">
          <button className={styles.dialogButton} onClick={handleClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 256 256"
            >
              <path
                fill="currentColor"
                d="M204.24 195.76a6 6 0 1 1-8.48 8.48L128 136.49l-67.76 67.75a6 6 0 0 1-8.48-8.48L119.51 128L51.76 60.24a6 6 0 0 1 8.48-8.48L128 119.51l67.76-67.75a6 6 0 0 1 8.48 8.48L136.49 128Z"
              />
            </svg>
          </button>
          {modalDialog.selectedComponent}
        </div>
      </div>
    )
  );
};
