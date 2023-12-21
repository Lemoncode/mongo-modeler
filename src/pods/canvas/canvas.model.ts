export type FieldType = "number" | "string" | "object";

export interface Coords {
  x: number;
  y: number;
}

export type GUID = string;

export const GenerateGUID = (): GUID => {
  return crypto.randomUUID();
};

export interface Table {
  id: string;
  fields: Field[]; // Asumiendo que Field es la interfaz para los campos de la tabla
  tableName: string;
  x: number; // Posición X en el canvas
  y: number; // Posición Y en el canvas
}

export interface Field {
  id: GUID;
  name: string;
  type: FieldType;
  children?: Field[];
  isCollapsed?: boolean;
}

export type RelationType = "1:1" | "1:M" | "M:1";

export interface Relation {
  fromTableId: string;
  toTableId: string;
  fromFieldId: string;
  toFieldId: string;
  type: RelationType;
}

export interface DatabaseSchema {
  tables: Table[];
  relations: Relation[];
}
