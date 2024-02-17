import React from 'react';
import { OpenIcon } from '@/common/components/icons/open-icon.component';
import { ToolbarButton } from '@/pods/toolbar/components/toolbar-button';
import {
  useCanvasSchemaContext,
  useCanvasViewSettingsContext,
} from '@/core/providers';
import { FileInput, OnFileSelectedCallback } from '@/common/file-input';
import classes from '@/pods/toolbar/toolbar.pod.module.css';
import { SHORTCUTS } from '../../shortcut/shortcut.const';

export const OpenButton: React.FC = () => {
  const { loadSchema } = useCanvasSchemaContext();
  const { setFilename, setLoadSample } = useCanvasViewSettingsContext();

  const handleFileRead = (fileContent: string) => {
    try {
      const parsedData = JSON.parse(fileContent);
      loadSchema(parsedData);
    } catch (error) {
      throw new Error('Error opening file' + error);
    }
  };

  const handleOpenButtonClick: OnFileSelectedCallback = (file: File) => {
    setFilename(file.name);
    const reader = new FileReader();
    reader.onload = e => {
      setLoadSample(false);
      const fileContent = e.target?.result as string;
      if (fileContent) handleFileRead(fileContent);
    };
    reader.readAsText(file);
  };

  return (
    <ToolbarButton
      icon={<OpenIcon />}
      label={'Open'}
      onClick={() => FileInput(handleOpenButtonClick)}
      className={classes.button}
      shortcutOptions={SHORTCUTS.open}
    />
  );
};
