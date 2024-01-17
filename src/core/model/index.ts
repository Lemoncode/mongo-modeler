export type FieldType = 'number' | 'string' | 'object' | 'objectId';
export type ExportType = 'svg' | 'png' | 'mongo';

export interface Size {
  width: number;
  height: number;
}

export interface Coords {
  x: number;
  y: number;
}

export type GUID = string;

export const GenerateGUID = (): GUID => {
  return crypto.randomUUID();
};
