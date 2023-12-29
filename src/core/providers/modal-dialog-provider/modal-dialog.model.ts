import React from 'react';

export interface ModalDialogModel {
  isOpen: boolean;
  selectedComponent: React.ReactNode | null;
}

export const createInitialModalDialog = (): ModalDialogModel => ({
  isOpen: false,
  selectedComponent: null,
});

export interface ModalDialogContextModel {
  openModal: (component: React.ReactNode | null) => void;
  closeModal: () => void;
  modalDialog: ModalDialogModel;
}
