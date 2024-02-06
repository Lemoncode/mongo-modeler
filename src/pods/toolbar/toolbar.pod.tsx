import React from 'react';
import {
  CanvasSettingButton,
  ZoomInButton,
  ZoomOutButton,
  RelationButton,
  AddCollection,
  ThemeToggleButton,
  ExportButton,
  NewButton,
  OpenButton,
  SaveButton,
  UndoButton,
  RedoButton,
  DeleteButton,
  AboutButton,
} from './components';
import classes from './toolbar.pod.module.css';

export const ToolbarPod: React.FC = () => {
  return (
    <div className={classes.container}>
      <NewButton />
      <OpenButton />
      <SaveButton />
      <ZoomInButton />
      <ZoomOutButton />
      <AddCollection />
      <RelationButton />
      <UndoButton />
      <RedoButton />
      <ExportButton />
      <DeleteButton />
      <CanvasSettingButton />
      <AboutButton />
      <ThemeToggleButton darkLabel="Dark Mode" lightLabel="Light Mode" />
    </div>
  );
};
