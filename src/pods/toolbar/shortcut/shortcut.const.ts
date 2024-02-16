import { ShortcutOptions } from './shortcut.model';

interface Shortcut {
  [key: string]: ShortcutOptions;
}

export const SHORTCUTS: Shortcut = {
  addCollection: {
    description: 'Add Collection',
    id: 'add-collection-button-shortcut',
    targetKey: ['c'],
    targetKeyLabel: 'C',
  },
  addRelation: {
    description: 'Add Relation',
    id: 'add-relation-button-shortcut',
    targetKey: ['r'],
    targetKeyLabel: 'R',
  },
  delete: {
    description: 'Delete',
    id: 'delete-button-shortcut',
    targetKey: ['backspace'],
    targetKeyLabel: 'Backspace',
  },
  export: {
    description: 'Export',
    id: 'export-button-shortcut',
    targetKey: ['e'],
    targetKeyLabel: 'E',
  },
  new: {
    description: 'New',
    id: 'new-button-shortcut',
    targetKey: ['n'],
    targetKeyLabel: 'N',
  },
  open: {
    description: 'Open',
    id: 'open-button-shortcut',
    targetKey: ['o'],
    targetKeyLabel: 'O',
  },
  redo: {
    description: 'Redo',
    id: 'redo-button-shortcut',
    targetKey: ['y'],
    targetKeyLabel: 'Y',
  },
  save: {
    description: 'Save',
    id: 'save-button-shortcut',
    targetKey: ['s'],
    targetKeyLabel: 'S',
  },
  settings: {
    description: 'Settings',
    id: 'settings-button-shortcut',
    targetKey: ['t'],
    targetKeyLabel: 'T',
  },
  undo: {
    description: 'Undo',
    id: 'undo-button-shortcut',
    targetKey: ['z'],
    targetKeyLabel: 'Z',
  },
  zoomIn: {
    description: 'Zoom In',
    id: 'zoom-in-button-shortcut',
    targetKey: ['=', '+'],
    targetKeyLabel: '"+"',
  },
  zoomOut: {
    description: 'Zoom Out',
    id: 'zoom-out-button-shortcut',
    targetKey: ['-', '-'],
    targetKeyLabel: '"-"',
  },
};
