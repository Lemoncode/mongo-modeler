import React from 'react';
import { ModalDialogContext } from './modal-dialog.context';
import {
  ModalDialogModel,
  createInitialModalDialog,
} from './modal-dialog.model';

interface Props {
  children: React.ReactNode;
}

export const ModalDialogProvider: React.FC<Props> = props => {
  const { children } = props;
  const [modalDialog, setModalDialog] = React.useState<ModalDialogModel>(
    createInitialModalDialog()
  );
  const openModal = (component: React.ReactNode | null) => {
    setModalDialog({
      isOpen: true,
      selectedComponent: component,
    });
  };

  const closeModal = () => {
    setModalDialog({
      isOpen: false,
      selectedComponent: null,
    });
  };
  return (
    <ModalDialogContext.Provider value={{ openModal, closeModal, modalDialog }}>
      {children}
    </ModalDialogContext.Provider>
  );
};

export const useModalDialogContext = () => {
  const context = React.useContext(ModalDialogContext);
  if (context === null) {
    throw 'useModalDialogContext: looks like you have forgotten to add the provider on top of the app :)';
  }

  return context;
};
