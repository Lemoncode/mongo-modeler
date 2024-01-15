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

  const openModal = (component: React.ReactNode | null, title: string) => {
    setModalDialog({
      isOpen: true,
      selectedComponent: component,
      title,
    });
  };

  const closeModal = () => {
    setModalDialog({
      isOpen: false,
      selectedComponent: null,
      title: '',
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
