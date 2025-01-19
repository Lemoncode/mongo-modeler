import { GUID, GenerateGUID } from '@/core/model';
import React from 'react';

export const useInputRefFocus = (
  onAdd: (id: GUID, newIndexId: GUID) => void
) => {
  const nameInputRefRecord = React.useRef<Record<string, HTMLInputElement>>({});

  const [newIndexId, setNewIndexId] = React.useState<GUID>('');

  const handleAdd = (id: GUID) => {
    const newIndexId = GenerateGUID();
    setNewIndexId(newIndexId);
    onAdd(id, newIndexId);
  };

  React.useEffect(() => {
    const input = nameInputRefRecord.current[newIndexId];

    if (input) {
      input.focus();
      input.select();
      setNewIndexId('');
    }
  }, [newIndexId, nameInputRefRecord.current]);

  return { handleAdd, nameInputRefRecord };
};
