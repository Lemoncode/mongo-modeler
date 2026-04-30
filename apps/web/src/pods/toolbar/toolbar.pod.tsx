import React from 'react';
import {
  // CanvasSettingButton,
  ZoomInButton,
  ZoomOutButton,
  ThemeToggleButton,
  ExportButton,
  NewButton,
  OpenButton,
  SaveButton,
  UndoButton,
  RedoButton,
  DeleteButton,
  AboutButton,
  CanvasSettingButton,
  CopyButton,
  PasteButton,
  ImportButton,
} from './components';
import classes from './toolbar.pod.module.css';

export const ToolbarPod: React.FC = () => {
  return (
    <header className={classes.container}>
      <NewButton />
      <OpenButton />
      <SaveButton />
      <ZoomInButton />
      <ZoomOutButton />
      <ImportButton />
      <CopyButton />
      <PasteButton />
      <UndoButton />
      <RedoButton />
      <ExportButton />
      <DeleteButton />
      <CanvasSettingButton />
      <AboutButton />
      <ThemeToggleButton darkLabel="Dark Mode" lightLabel="Light Mode" />
    </header>
  );
};
