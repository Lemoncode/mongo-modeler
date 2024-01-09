import React from 'react';

export interface ModalDialogModel {
  isOpen: boolean;
  selectedComponent: React.ReactNode | null;
  title: TitleList;
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
    title: TitleList,
    subtitle?: string
  ) => void;
  closeModal: () => void;
  modalDialog: ModalDialogModel;
}

export const CANVAS_SETTINGS_TITLE = 'Canvas Settings';
export const EDDIT_TABLE_TITLE = 'Edit table';
export const EDDIT_RELATION_TITLE = 'Edit relation';

export type TitleList =
  | ''
  | typeof CANVAS_SETTINGS_TITLE
  | typeof EDDIT_TABLE_TITLE
  | typeof EDDIT_RELATION_TITLE;
