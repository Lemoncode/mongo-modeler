import { GUID, GenerateGUID } from '@/core/model';
import React from 'react';

export const useInputRefFocus = (
  onAddField: (fieldId: GUID, isChildren: boolean, newFieldId: GUID) => void
) => {
  const nameInputRefRecord = React.useRef<Record<string, HTMLInputElement>>({});

  const [newFielId, setNewFieldId] = React.useState<GUID>('');

  const handleAddField = (fieldId: GUID, isChildren: boolean) => {
    const newFieldId = GenerateGUID();
    setNewFieldId(newFieldId);
    onAddField(fieldId, isChildren, newFieldId);
  };

  React.useEffect(() => {
    const input = nameInputRefRecord.current[newFielId];

    if (input) {
      input.focus();
      input.select();
      setNewFieldId('');
    }
  }, [newFielId, nameInputRefRecord.current]);

  return { handleAddField, nameInputRefRecord };
};
