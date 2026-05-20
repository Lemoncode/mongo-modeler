export type ModifierType = 'system' | 'alt' | 'none';

export interface ShortcutOptions {
  id: string;
  targetKey: string[];
  targetKeyLabel: string;
  description: string;
  modifierType?: ModifierType;
}
