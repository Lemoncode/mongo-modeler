import React from 'react';

import { ModalDialogContextModel } from './modal-dialog.model';

export const ModalDialogContext =
  React.createContext<ModalDialogContextModel | null>(null);
