import React from 'react';

export interface ModalDialogModel {
  isOpen: boolean;
  selectedComponent: React.ReactNode | null;
  title: string;
  subtitle?: string;
  handleUpdateTableName?: (value: string) => void;
}

export const createInitialModalDialog = (): ModalDialogModel => ({
  isOpen: false,
  selectedComponent: null,
  title: '',
  subtitle: undefined,
  handleUpdateTableName: undefined,
});

export interface ModalDialogContextModel {
  openModal: (
    component: React.ReactNode | null,
    title: string,
    subtitle?: string,
    handleUpdateTableName?: (value: string) => void
  ) => void;
  closeModal: () => void;
  modalDialog: ModalDialogModel;
}
