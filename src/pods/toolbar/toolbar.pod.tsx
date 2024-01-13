import React from 'react';
import {
  CanvasSettingButton,
  ZoomInButton,
  ZoomOutButton,
  RelationButton,
  EditButton,
  ThemeToggleButton,
} from './components';
import classes from './toolbar.pod.module.css';
import { ExportButton } from './components/export-button';

export const ToolbarPod: React.FC = () => {
  return (
    <div className={classes.container}>
      <ZoomInButton />
      <ZoomOutButton />
      <EditButton />
      <RelationButton />
      <ExportButton />
      <CanvasSettingButton />
      <ThemeToggleButton darkLabel="Dark Mode" lightLabel="Light Mode" />
    </div>
  );
};
