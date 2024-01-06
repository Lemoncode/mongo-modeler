import React from 'react';

export interface ModalDialogModel {
  isOpen: boolean;
  selectedComponent: React.ReactNode | null;
  maximize?: boolean;
}

export const createInitialModalDialog = (): ModalDialogModel => ({
  isOpen: false,
  selectedComponent: null,
});

export interface ModalDialogContextModel {
  openModal: (component: React.ReactNode | null, maximize?: boolean) => void;
  closeModal: () => void;
  modalDialog: ModalDialogModel;
}
