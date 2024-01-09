import React from 'react';

export interface ModalDialogModel {
  isOpen: boolean;
  selectedComponent: React.ReactNode | null;
  title: string;
  subtitle?: string;
}

export const createInitialModalDialog = (): ModalDialogModel => ({
  isOpen: false,
  selectedComponent: null,
  title: '',
  subtitle: undefined,
});

export interface ModalDialogContextModel {
  openModal: (
    component: React.ReactNode | null,
    title: string,
    subtitle?: string
  ) => void;
  closeModal: () => void;
  modalDialog: ModalDialogModel;
}
