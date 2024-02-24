import { useModalDialogContext } from '@/core/providers/modal-dialog-provider';
import { KeySelectionTable } from '@/core/autosave/components';

import { useState } from 'react';
import { getSavedKeys } from '@/core/autosave';

export const useRetrieveSchemaKey = () => {
  const { openModal, closeModal } = useModalDialogContext();

  const [retrievedKey, setRetrievedKey] = useState('');
  const [popModal, setPopModal] = useState(false);

  const retrieveSchemaKey = (
    AUTOSAVE_KEY: string,
    SELECTION_TABLE_TITLE: string,
    setIsDeletingAll: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    const lookingForSavedSchemasKeys = getSavedKeys(AUTOSAVE_KEY);

    if (!popModal && lookingForSavedSchemasKeys.length === 1) {
      const uniqueKey = lookingForSavedSchemasKeys[0];
      setRetrievedKey(uniqueKey);
      setPopModal(true);
    } else if (!popModal && lookingForSavedSchemasKeys.length > 1) {
      openModal(
        <KeySelectionTable
          setRetrievedKey={setRetrievedKey}
          keys={lookingForSavedSchemasKeys}
          onClose={closeModal}
          setIsDeletingAll={setIsDeletingAll}
        />,
        SELECTION_TABLE_TITLE
      );

      setPopModal(true);
    }
  };

  return { retrieveSchemaKey, retrievedKey };
};
