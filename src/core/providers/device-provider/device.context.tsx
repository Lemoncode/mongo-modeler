import React from 'react';
import { DeviceContextModel } from './device.model';

export const DeviceContext = React.createContext<DeviceContextModel | null>(
  null
);
