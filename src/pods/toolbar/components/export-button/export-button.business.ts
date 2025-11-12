import {
  FieldVm,
  TableVm,
  TABLE_CONST,
  NoteVm,
  NOTE_CONST,
} from '@/core/providers';
import { doTablesOverlap } from './export-coordinate.helpers';
import { calculateNoteAutoHeight } from '@/pods/canvas/components/note';

export const getMaxPositionXFromTables = (tables: TableVm[]): number =>
  tables.length === 0 ? 0 : Math.max(...tables.map(table => table.x));

export const getMaxEndPositionXFromTables = (tables: TableVm[]): number =>
  tables.length === 0
    ? 0
    : Math.max(
        ...tables.map(
          table => table.x + (table.width ?? TABLE_CONST.DEFAULT_TABLE_WIDTH)
        )
      );

export const getMinPositionXFromTables = (tables: TableVm[]): number =>
  tables.length === 0 ? 0 : Math.min(...tables.map(table => table.x));

export const getTotalCanvasWidthFromTables = (tables: TableVm[]): number => {
  if (tables.length === 0) return 0;

  const minX = getMinPositionXFromTables(tables);
  const maxEndX = getMaxEndPositionXFromTables(tables);

  // Si hay tablas en posiciones negativas, calculamos el ancho total
  // desde la posición más a la izquierda hasta la más a la derecha
  return maxEndX - Math.min(minX, 0);
};

export const normalizeTablesForExport = (tables: TableVm[]): TableVm[] => {
  if (tables.length === 0) return tables;

  const minX = getMinPositionXFromTables(tables);

  // Si hay tablas en posiciones negativas, las desplazamos todas hacia la derecha
  const offsetX =
    minX < 0
      ? Math.abs(minX) + TABLE_CONST.CANVAS_PADDING
      : TABLE_CONST.CANVAS_PADDING;

  return tables.map(table => ({
    ...table,
    x: table.x + offsetX,
  }));
};

export const getFieldsCount = (fields: FieldVm[]): number =>
  fields.reduce((acc, field) => {
    if (field.children && field.children.length > 0 && !field.isCollapsed) {
      return acc + 1 + getFieldsCount(field.children);
    }

    return acc + 1;
  }, 0);

export const calculateTableHeight = (fields: FieldVm[]): number => {
  const countFieldInTable = getFieldsCount(fields);
  const rowHeightTotal = countFieldInTable * TABLE_CONST.ROW_HEIGHT;
  const headerHeight = TABLE_CONST.HEADER_HEIGHT;
  const headerTitleGap = TABLE_CONST.HEADER_TITLE_GAP;
  const bottomPadding = TABLE_CONST.ROW_PADDING;

  return rowHeightTotal + headerHeight + headerTitleGap + bottomPadding;
};

export const calculateTableEndYPosition = (table: TableVm): number => {
  const tableHeight = calculateTableHeight(table.fields);

  return table.y + tableHeight;
};

export const doesTableOverlap = (
  tableA: TableVm,
  tables: TableVm[]
): boolean => {
  if (tables.length === 0) {
    return false;
  }

  const tablesMinusOriginTableCollection = tables.filter(
    t => t.id !== tableA.id
  );

  return tablesMinusOriginTableCollection.some(tableB =>
    doTablesOverlap(tableA, tableB)
  );
};

export const placeTableWithoutOverlap = (
  table: TableVm,
  tables: TableVm[]
): TableVm => {
  let newTable = table;
  let attempts = 0;

  while (
    doesTableOverlap(newTable, tables) &&
    attempts < TABLE_CONST.MAX_PLACEMENT_ATTEMPTS
  ) {
    newTable = {
      ...newTable,
      x: newTable.x - TABLE_CONST.TABLE_SHIFT_DISTANCE,
    };

    if (newTable.x < 0) {
      newTable = {
        ...newTable,
        x: TABLE_CONST.TABLE_SHIFT_DISTANCE,
        y: newTable.y + TABLE_CONST.TABLE_SHIFT_DISTANCE,
      };
    }

    attempts++;
  }

  return newTable;
};

export const placeAllTablesWithoutOverlap = (tables: TableVm[]): TableVm[] => {
  const placedTables: TableVm[] = [];

  for (const table of tables) {
    const newTable = placeTableWithoutOverlap(table, placedTables);
    placedTables.push(newTable);
  }

  return placedTables;
};

export const getMaxPositionYFromTables = (tables: TableVm[]): number =>
  tables.length === 0 ? 0 : Math.max(...tables.map(calculateTableEndYPosition));

export const expandTableFields = (fields: FieldVm[]): FieldVm[] =>
  fields.map(field => ({
    ...field,
    children: field.children ? expandTableFields(field.children) : [],
    isCollapsed: false,
  }));

export const expandAllFieldsInTables = (table: TableVm[]) =>
  table.map(table => ({
    ...table,
    fields: expandTableFields(table.fields),
  }));

// Export Schema functions
export const getPropertyJsonSchema = (field: FieldVm): string => {
  if (field.isArray) {
    return `"${field.name}": { bsonType: "array", items: { bsonType: "${field.type}" } }`;
  }

  if (field.children && field.children.length > 0) {
    const properties = getPropertiesJsonSchema(field.children, false);
    return `"${field.name}": { bsonType: "object", title: "${field.name}", properties: { ${properties}, }, }`;
  }
  return `"${field.name}": { bsonType: "${field.type}" }`;
};

export const getPropertiesJsonSchema = (
  fields: FieldVm[],
  useTab = true
): string => {
  const separator = useTab ? ',\n        ' : ', ';
  return fields.map(getPropertyJsonSchema).join(separator);
};

export const getRequiredFields = (fields: FieldVm[]): string => {
  return fields
    .filter(field => field.isNN)
    .map(field => `"${field.name}"`)
    .join(', ');
};

export const getSchemaScriptFromTableVm = (table: TableVm): string => {
  const properties = getPropertiesJsonSchema(table.fields);
  const schemaScript = `db.createCollection("${table.tableName}", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "${table.tableName}",
      required: [${getRequiredFields(table.fields)}],
      properties: {
        ${properties},
      },
    },
  },
});`;

  return schemaScript;
};

export const getSchemaScriptFromTableVmArray = (tables: TableVm[]): string => {
  return tables.map(getSchemaScriptFromTableVm).join('\n\n');
};

export const getMaxEndPositionXFromNotes = (notes: NoteVm[]): number =>
  notes.length === 0
    ? 0
    : Math.max(
        ...notes.map(
          note => note.x + (note.width ?? NOTE_CONST.DEFAULT_NOTE_WIDTH)
        )
      );

export const getMaxPositionYFromNotes = (notes: NoteVm[]): number => {
  if (notes.length === 0) return 0;

  return Math.max(
    ...notes.map(note => {
      const noteHeight = calculateNoteAutoHeight(
        note.description,
        note.width ?? NOTE_CONST.DEFAULT_NOTE_WIDTH
      );
      return note.y + noteHeight;
    })
  );
};

export const normalizeNotesForExport = (
  notes: NoteVm[],
  offsetX: number
): NoteVm[] => {
  return notes.map(note => ({
    ...note,
    x: note.x + offsetX,
  }));
};

export const getTotalCanvasWidthFromSchema = (
  tables: TableVm[],
  notes: NoteVm[]
): number => {
  const tableWidth = getTotalCanvasWidthFromTables(tables);
  const noteMaxX = getMaxEndPositionXFromNotes(notes);

  return Math.max(tableWidth, noteMaxX);
};

export const getMaxPositionYFromSchema = (
  tables: TableVm[],
  notes: NoteVm[]
): number => {
  const tableMaxY = getMaxPositionYFromTables(tables);
  const noteMaxY = getMaxPositionYFromNotes(notes);

  return Math.max(tableMaxY, noteMaxY);
};
