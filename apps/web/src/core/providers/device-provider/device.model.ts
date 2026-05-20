export interface DeviceModel {
  isTabletOrMobileDevice: boolean;
}

export const createInitialDevice = (): DeviceModel => ({
  isTabletOrMobileDevice: false,
});

export interface DeviceContextModel {
  isTabletOrMobileDevice: boolean;
}
