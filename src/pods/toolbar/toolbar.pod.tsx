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

export const ToolbarPod: React.FC = () => {
  return (
    <div className={classes.container}>
      <ZoomInButton />
      <ZoomOutButton />
      <CanvasSettingButton />
      <RelationButton />
      <EditButton />
      <ThemeToggleButton darkLabel="Dark Mode" lightLabel="Light Mode" />
    </div>
  );
};
