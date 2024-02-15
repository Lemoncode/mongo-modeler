import { FieldVm, TableVm, TABLE_CONST } from '@/core/providers';

export const getMaxPositionXFromTables = (tables: TableVm[]): number =>
  tables.length === 0 ? 0 : Math.max(...tables.map(table => table.x));

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

export const getMaxPositionYFromTables = (tables: TableVm[]): number =>
  tables.length === 0 ? 0 : Math.max(...tables.map(calculateTableEndYPosition));

const expandTableFields = (fields: FieldVm[]): FieldVm[] =>
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
const getPropertyJsonSchema = (field: FieldVm): string => {
  if (field.isArray) {
    return `"${field.name}": { bsonType: "array", items: { bsonType: "${field.type}" } }`;
  }

  if (field.children && field.children.length > 0) {
    const properties = getPropertiesJsonSchema(field.children, false);
    return `"${field.name}": { bsonType: "object", title: "${field.name}", properties: { ${properties}, }, }`;
  }
  return `"${field.name}": { bsonType: "${field.type}" }`;
};

const getPropertiesJsonSchema = (fields: FieldVm[], useTab = true): string => {
  const separator = useTab ? ',\n        ' : ', ';
  return fields.map(getPropertyJsonSchema).join(separator);
};

const getRequiredFields = (fields: FieldVm[]): string => {
  return fields
    .filter(field => field.isNN)
    .map(field => `"${field.name}"`)
    .join(', ');
};

const getSchemaScriptFromTableVm = (table: TableVm): string => {
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
