import React from 'react';
import classes from './footer.pod.module.css';
import {
  useCanvasSchemaContext,
  useCanvasViewSettingsContext,
  useThemeContext,
} from '@/core/providers';
import { DarkIcon, LightIcon } from '@/common/components';
import { useDeviceContext } from '@/core/providers';
import {
  getFileNameCanvasIsPristine,
  getFileNameCanvasDirty,
} from '@/pods/footer/footer.business';
import { ZoomInButton, ZoomOutButton } from './components/zoom-button';

const NEW_DOCUMENT_NAME = 'New Document';
const ASTERISK = '*';

export const FooterComponent: React.FC = () => {
  const { canvasSchema } = useCanvasSchemaContext();
  const { canvasViewSettings } = useCanvasViewSettingsContext();
  const { theme, toggleTheme } = useThemeContext();
  const { isTabletOrMobileDevice: isDevice } = useDeviceContext();
  const { filename } = canvasViewSettings;
  const documentNameMobile = () =>
    filename ? `${filename} - Read Only` : `Read Only`;

  const documentName = () =>
    canvasSchema.isPristine
      ? getFileNameCanvasIsPristine(filename, NEW_DOCUMENT_NAME)
      : getFileNameCanvasDirty(filename, NEW_DOCUMENT_NAME, ASTERISK);
  return (
    <footer className={classes.footerText}>
      <span>{isDevice ? documentNameMobile() : documentName()}</span>
      <div className={classes.zoomButtons}>
        <ZoomOutButton />
        <ZoomInButton />
      </div>
      <button onClick={toggleTheme} className="mobile-only">
        {theme.themeMode === 'dark' ? <LightIcon /> : <DarkIcon />}
      </button>
    </footer>
  );
};
