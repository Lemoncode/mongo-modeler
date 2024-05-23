import React from 'react';
import {
  // CanvasSettingButton,
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
  CanvasSettingButton,
} from './components';
import classes from './toolbar.pod.module.css';

export const ToolbarPod: React.FC = () => {
  return (
    <div className={classes.container}>
      <ul>
        <li>
          <NewButton />
        </li>
        <li>
          <OpenButton />
        </li>
        <li>
          <SaveButton />
        </li>
        <li>
          <ExportButton />
        </li>
      </ul>
      <ul>
        <li>
          <ZoomInButton />
        </li>
        <li>
          <ZoomOutButton />
        </li>
      </ul>
      <ul>
        <li>
          <AddCollection />
        </li>
        <li>
          <RelationButton />
        </li>
      </ul>
      <ul>
        <UndoButton />
        <RedoButton />
        <DeleteButton />
      </ul>
      <ul>
        <li>
          <CanvasSettingButton />
        </li>
        <li>
          <AboutButton />
        </li>
        <li>
          <ThemeToggleButton darkLabel="Dark Mode" lightLabel="Light Mode" />
        </li>
      </ul>
    </div>
  );
};
