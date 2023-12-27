import React from 'react';
import styles from './modal-dialog.styles.module.css';

export interface Props {
  children: React.ReactNode;
  isOpen: boolean;
}

export const ModalDialog: React.FC<Props> = props => {
  const { children, isOpen } = props;
  const [open, setOpen] = React.useState(isOpen);
  const handleClick = () => {
    setOpen(false);
  };

  return (
    open && (
      <div className={styles.container} role="presentation">
        <div className={styles.dialog} role="dialog">
          <button className={styles.dialogButton} onClick={handleClick}>
            Close
          </button>
          {children}
        </div>
      </div>
    )
  );
};
