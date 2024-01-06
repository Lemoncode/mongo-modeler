import React from 'react';
import { CanvasSchemaContextVm } from './canvas-schema.model';

export const CanvasSchemaContext =
  React.createContext<CanvasSchemaContextVm | null>(null);
