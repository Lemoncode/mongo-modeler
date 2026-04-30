import React from 'react';
import { CanvasSchemaContextVm } from './canvas-schema-vlatest.model';

export const CanvasSchemaContext =
  React.createContext<CanvasSchemaContextVm | null>(null);
