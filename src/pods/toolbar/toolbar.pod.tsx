import React from 'react';
import { ThemeToggleButton } from './components/theme-toggle-button';
import { EditButton } from './components/edit-button';
import { RelationButton } from './components/relation-button';
import { CanvasSettingButton } from './components/canvas-setting-button';
import { ZoomInButton, ZoomOutButton } from './components/zoom-button';
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
