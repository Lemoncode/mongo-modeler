import React from 'react';
import { DeviceModel, createInitialDevice } from './device.model';
import { DeviceContext } from './device.context';

interface Props {
  children: React.ReactNode;
}

export const DeviceProvider: React.FC<Props> = props => {
  const { children } = props;
  const [deviceInfo, setDeviceInfo] = React.useState<DeviceModel>(
    createInitialDevice()
  );

  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(max-device-width: 1090px)');
    setDeviceInfo({ isTabletOrMobileDevice: mediaQuery.matches });

    const handleResize = () => {
      setDeviceInfo({ isTabletOrMobileDevice: mediaQuery.matches });
    };

    mediaQuery.addEventListener('change', handleResize);

    return () => {
      mediaQuery.removeEventListener('change', handleResize);
    };
  }, []);

  return (
    <DeviceContext.Provider value={deviceInfo}>
      {children}
    </DeviceContext.Provider>
  );
};

export const useDeviceContext = () => {
  const context = React.useContext(DeviceContext);
  if (context === null) {
    throw new Error(
      'useDeviceContext: Ensure you have wrapped your app with DeviceProvider'
    );
  }

  return context;
};
