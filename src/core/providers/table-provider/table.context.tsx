import { createContext } from 'react';
import { TableContextModel } from './table.model';

export const TableContext = createContext<TableContextModel | null>(null);
