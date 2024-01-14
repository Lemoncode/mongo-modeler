import React from 'react';
import { Edit } from '../../icons';
import styles from '../modal-dialog.styles.module.css';

interface Props {
  tableName: string;
  handleUpdateTableName: (value: string) => void;
}

export const MDChangeTableName: React.FC<Props> = props => {
  const { tableName, handleUpdateTableName } = props;

  const [value, setValue] = React.useState(tableName);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
    handleUpdateTableName(value);
  };

  return (
    <>
      <span>&gt;</span>
      <input
        type="text"
        className={styles.dialogSubtitle}
        value={value}
        onChange={handleChange}
      />
      <Edit />
    </>
  );
};
