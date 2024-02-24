import classes from '@/core/autosave/components/keySelection-table.module.css';
import { useEffect, useState } from 'react';

interface Props {
  setRetrievedKey: React.Dispatch<React.SetStateAction<string>>;
  keys: string[];
  onClose: () => void;
  setIsDeletingAll: React.Dispatch<React.SetStateAction<boolean>>;
}

export const KeySelectionTable: React.FC<Props> = props => {
  const { setRetrievedKey, keys, onClose, setIsDeletingAll } = props;

  const [updateKeys, setUpdateKeys] = useState(keys);

  const keysToDateString = keys.map(key => {
    const transformKeytoDating = parseInt(key.split('_')[1]);
    return new Date(transformKeytoDating).toLocaleString();
  });

  const handleSetSchemaKey = (key: string) => {
    setRetrievedKey(key);
    onClose();
  };

  const handleDeleteSchemaKey = (key: string) => {
    localStorage.removeItem(key);
    setUpdateKeys(keys.splice(keys.indexOf(key), 1));
  };

  const handleSetSchemaKeyAndDeleteAll = (key: string) => {
    setRetrievedKey(key);
    handleCloseAndDeleteAll();
  };

  const handleCloseAndDeleteAll = () => {
    setIsDeletingAll(true);
    onClose();
  };

  const getFilenameFromLocal = (key: string) => {
    const storedValue = localStorage.getItem(key);
    if (storedValue) {
      const parsedValue = JSON.parse(storedValue);
      return parsedValue.filename || 'No file name';
    }
  };

  useEffect(() => {
    if (updateKeys.length === 0) {
      onClose();
    }
  }, [updateKeys]);

  return (
    <>
      <div>You have auto saved the following schemas: </div>

      <div className={classes.tableContainer}>
        <div className={classes.headerRow}>
          <div className={classes.headerCell}>File Name</div>
          <div className={classes.headerCell}>Last Save Date</div>
          <div className={classes.headerCell}>Actions</div>
        </div>
        {!updateKeys && <div>Loading autosaved schemas...</div>}
        {updateKeys &&
          keys.map((key, index) => (
            <div key={key} className={classes.fieldRow}>
              <span className={classes.fieldCell}>
                {getFilenameFromLocal(key)}
              </span>
              <span
                className={classes.fieldCell}
                defaultValue={keysToDateString[index]}
              >
                {keysToDateString[index]}
              </span>
              <div className={classes.fieldCell}>
                <button
                  className="button-tertiary"
                  onClick={() => handleSetSchemaKey(key)}
                >
                  Load
                </button>
                <button
                  className="button-tertiary"
                  onClick={() => handleDeleteSchemaKey(key)}
                >
                  Delete
                </button>
                <button
                  className="button-tertiary"
                  onClick={() => handleSetSchemaKeyAndDeleteAll(key)}
                >
                  Load and Delete All
                </button>
              </div>
            </div>
          ))}
      </div>
      <div>
        <button
          style={{ margin: '0 0.4rem' }}
          className="button-tertiary"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          style={{ margin: '0 0.4rem' }}
          className="button-tertiary"
          onClick={handleCloseAndDeleteAll}
        >
          Cancel and Delete All
        </button>
      </div>
    </>
  );
};
