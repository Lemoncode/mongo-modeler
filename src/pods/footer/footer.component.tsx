import React from 'react';
import classes from './footer.pod.module.css';
import {
  useCanvasViewSettingsContext,
  useThemeContext,
} from '@/core/providers';
import { DarkIcon, LightIcon } from '@/common/components';

const NEW_DOCUMENT_NAME = 'New Document';

export const FooterComponent: React.FC = () => {
  const { filename } = useCanvasViewSettingsContext();
  const { theme, toggleTheme } = useThemeContext();
  const [isMobile, setIsMobile] = React.useState(false);

  const documentNameMobile = () =>
    filename ? `${filename} - Read Only` : `Read Only`;

  const documentName = () => (filename ? filename : NEW_DOCUMENT_NAME);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(max-device-width: 1090px)');
    setIsMobile(mediaQuery.matches);

    const handleResize = () => {
      setIsMobile(mediaQuery.matches);
    };

    mediaQuery.addEventListener('change', handleResize);

    return () => {
      mediaQuery.removeEventListener('change', handleResize);
    };
  }, []);

  return (
    <div className={classes.footerText}>
      <span>{isMobile ? documentNameMobile() : documentName()}</span>
      <button onClick={toggleTheme} className="mobile-only">
        {theme.themeMode === 'dark' ? <LightIcon /> : <DarkIcon />}
      </button>
    </div>
  );
};
