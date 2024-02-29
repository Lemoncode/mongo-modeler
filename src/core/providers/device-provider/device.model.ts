export interface DeviceModel {
  isDevice: boolean;
}

export const createInitialDevice = (): DeviceModel => ({ isDevice: false });

export interface DeviceContextModel {
  isDevice: boolean;
}
