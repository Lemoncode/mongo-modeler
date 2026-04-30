export type FieldType =
  | 'any'
  | 'array'
  | 'binData'
  | 'bool'
  | 'date'
  | 'dbPointer'
  | 'decimal'
  | 'double'
  | 'enum'
  | 'int'
  | 'javascript'
  | 'long'
  | 'maxKey'
  | 'minKey'
  | 'null'
  | 'object'
  | 'objectId'
  | 'regex'
  | 'string'
  | 'symbol'
  | 'timestamp'
  | 'undefined';

export enum ExportType {
  SVG = 'svg',
  PNG = 'png',
  MONGO = 'mongo',
  SCHEMA = 'schema',
}

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
