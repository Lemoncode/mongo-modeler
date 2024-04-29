import React from 'react';
import classes from './footer.pod.module.css';
import {
  useCanvasSchemaContext,
  useCanvasViewSettingsContext,
  useThemeContext,
} from '@/core/providers';
import { DarkIcon, LightIcon } from '@/common/components';
import { useDeviceContext } from '@/core/providers';

const NEW_DOCUMENT_NAME = 'New Document';
const ASTERISK = '*';

export const FooterComponent: React.FC = () => {
  const { canvasSchema } = useCanvasSchemaContext();
  const { filename } = useCanvasViewSettingsContext();
  const { theme, toggleTheme } = useThemeContext();
  const { isTabletOrMobileDevice: isDevice } = useDeviceContext();

  const documentNameMobile = () =>
    filename ? `${filename} - Read Only` : `Read Only`;

  const documentName = () =>
    filename && canvasSchema.isPristine
      ? filename
      : `${NEW_DOCUMENT_NAME} ${ASTERISK}`;
  return (
    <div className={classes.footerText}>
      <span>{isDevice ? documentNameMobile() : documentName()}</span>
      <button onClick={toggleTheme} className="mobile-only">
        {theme.themeMode === 'dark' ? <LightIcon /> : <DarkIcon />}
      </button>
    </div>
  );
};
