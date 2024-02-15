import React from 'react';
import classes from './footer.pod.module.css';
import { useCanvasViewSettingsContext } from '@/core/providers';

const NEW_DOCUMENT_NAME = 'New Document';

export const FooterComponent: React.FC = () => {
  const { filename } = useCanvasViewSettingsContext();

  const documentName = () => (filename ? filename : NEW_DOCUMENT_NAME);

  return (
    <>
      <span className={classes.footerText}>{documentName()}</span>
    </>
  );
};
