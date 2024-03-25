import React from 'react';
import { TableContext } from './table.context';

interface Props {
  children: React.ReactNode;
}

export const TableProvider: React.FC<Props> = props => {
  const { children } = props;
  const [isTitleInEditMode, setIsTitleInEditMode] =
    React.useState<boolean>(false);

  return (
    <TableContext.Provider value={{ isTitleInEditMode, setIsTitleInEditMode }}>
      {children}
    </TableContext.Provider>
  );
};

export const useTableContext = () => {
  const context = React.useContext(TableContext);
  if (context === null) {
    throw new Error(
      'useTableContext: Ensure you have wrapped your Table with TableContext.Provider'
    );
  }

  return context;
};
