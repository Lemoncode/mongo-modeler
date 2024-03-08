import React from 'react';
import styles from './modal-dialog.styles.module.css';
import { useModalDialogContext } from '@/core/providers/modal-dialog-provider';
import { AnimatePresence, motion } from 'framer-motion';
import {
  handleEscapeKeyDown,
  handleFocus,
  handleNextFocus,
  handleTabsInsideDialog,
} from './modal.dialog.bussines';

export const ModalDialog: React.FC = () => {
  const { closeModal, modalDialog } = useModalDialogContext();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const previousFocusedElement = React.useRef<Element | null>(null);

  const handleClick = () => {
    closeModal();
  };

  const handleEscapeKeyDownEvent = (e: KeyboardEvent) =>
    handleEscapeKeyDown(e, closeModal);

  const handleTabsInsideDialogEvent = (e: KeyboardEvent) =>
    handleTabsInsideDialog(e, containerRef);

  React.useEffect(() => {
    if (modalDialog.isOpen) {
      document.body.classList.add('overflow-hidden');
      document.addEventListener('keydown', handleEscapeKeyDownEvent);
      document.addEventListener('keydown', handleTabsInsideDialogEvent);
      handleFocus(previousFocusedElement, containerRef);
    } else {
      handleNextFocus(previousFocusedElement);
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
      document.removeEventListener('keydown', handleEscapeKeyDownEvent);
      document.removeEventListener('keydown', handleTabsInsideDialogEvent);
    };
  }, [modalDialog.isOpen]);

  return (
    <AnimatePresence>
      {modalDialog.isOpen && (
        <motion.div
          className={styles.container}
          role="presentation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            className={styles.dialog}
            role="dialog"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4 }}
            ref={containerRef}
            tabIndex={-1}
            aria-labelledby="modal-modal-title"
          >
            <div className={styles.dialogHeader}>
              <h2 className={styles.dialogTitle} id="modal-modal-title">
                {modalDialog.title}
              </h2>
              <button
                className={styles.dialogButton}
                onClick={handleClick}
                aria-label="close modal dialog"
              >
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
            </div>
            <div className={styles.dialogComponent}>
              {modalDialog.selectedComponent}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
