import React from 'react';
import { DeviceModel, createInitialDevice } from './device.model';
import { DeviceContext } from './device.context';

interface Props {
  children: React.ReactNode;
}

export const DeviceProvider: React.FC<Props> = props => {
  const { children } = props;
  const [device, setDevice] = React.useState<DeviceModel>(
    createInitialDevice()
  );

  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(max-device-width: 1090px)');
    setDevice({ isDevice: mediaQuery.matches });

    const handleResize = () => {
      setDevice({ isDevice: mediaQuery.matches });
    };

    mediaQuery.addEventListener('change', handleResize);

    return () => {
      mediaQuery.removeEventListener('change', handleResize);
    };
  }, []);

  return (
    <DeviceContext.Provider value={device}>{children}</DeviceContext.Provider>
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
