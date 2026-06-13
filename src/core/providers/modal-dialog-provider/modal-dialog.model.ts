import React from 'react';

export interface ModalDialogModel {
  isOpen: boolean;
  selectedComponent: React.ReactNode | null;
  title: string;
  compact?: boolean;
}

export const createInitialModalDialog = (): ModalDialogModel => ({
  isOpen: false,
  selectedComponent: null,
  title: '',
  compact: false,
});

export interface ModalDialogContextModel {
  openModal: (component: React.ReactNode | null, title: string, compact?: boolean) => void;
  closeModal: () => void;
  modalDialog: ModalDialogModel;
}
