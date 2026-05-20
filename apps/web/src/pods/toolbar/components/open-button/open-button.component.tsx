import React from 'react';
import { OpenIcon } from '@/common/components/icons/open-icon.component';
import {
  useCanvasSchemaContext,
  useCanvasViewSettingsContext,
} from '@/core/providers';
import { FileInput, OnFileSelectedCallback } from '@/common/file-input';
import { ActionButton } from '@/common/components/action-button';
import { SHORTCUTS } from '@/common/shortcut';

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
    <ActionButton
      icon={<OpenIcon />}
      label={'Open'}
      onClick={() => FileInput(handleOpenButtonClick)}
      shortcutOptions={SHORTCUTS.open}
    />
  );
};
