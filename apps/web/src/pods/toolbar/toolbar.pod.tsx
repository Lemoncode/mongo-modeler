import { isVSCodeEnv } from '@/core/vscode/env.helpers';
import React from 'react';
import {
  AboutButton,
  CanvasSettingButton,
  CopyButton,
  DeleteButton,
  ExportButton,
  ImportButton,
  NewButton,
  OpenButton,
  PasteButton,
  RedoButton,
  SaveButton,
  ThemeToggleButton,
  UndoButton,
  // CanvasSettingButton,
  ZoomInButton,
  ZoomOutButton,
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
      {!isVSCodeEnv() && (
        <ThemeToggleButton darkLabel="Dark Mode" lightLabel="Light Mode" />
      )}
    </header>
  );
};
