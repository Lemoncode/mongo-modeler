import { produce } from 'immer';
import { FieldVm, RelationVm, TableVm } from './canvas-schema.model';
import { DatabaseSchemaVm } from './canvas-schema.model';
import { GUID } from '@/core/model';

const getFieldIdCollectionFromTable = (table: TableVm): GUID[] => {
  const fieldIds: GUID[] = [];

  const collectFieldIds = (field: FieldVm) => {
    fieldIds.push(field.id);
    if (field.children) {
      field.children.forEach(collectFieldIds);
    }
  };

  table.fields.forEach(collectFieldIds);
  return fieldIds;
};

const extractDeletedFields = (
  originalFieldIds: GUID[],
  newFieldIds: GUID[]
): GUID[] => {
  const deletedFieldIdsCollection: GUID[] = [];

  originalFieldIds.forEach(originalFieldId => {
    if (newFieldIds.find(id => id === originalFieldId) === undefined) {
      deletedFieldIdsCollection.push(originalFieldId);
    }
  });

  return deletedFieldIdsCollection;
};

const removeRelationsThatContainsDeletedFields = (
  relationCollection: RelationVm[],
  fieldIdsDeleted: GUID[]
): RelationVm[] =>
  relationCollection.filter(
    relation =>
      fieldIdsDeleted.find(id => id === relation.fromFieldId) === undefined &&
      fieldIdsDeleted.find(id => id === relation.toFieldId) === undefined
  );

interface TablesInfo {
  originTable: TableVm;
  updatedTable: TableVm;
}

const pruneOrphanRelationsLogic = (
  tablesInfo: TablesInfo,
  relations: RelationVm[]
): RelationVm[] => {
  const { originTable, updatedTable } = tablesInfo;
  const originFieldIds = getFieldIdCollectionFromTable(originTable);
  const updatedFieldIds = getFieldIdCollectionFromTable(updatedTable);

  // 1. Extract Deleted Fields
  const deletedFields = extractDeletedFields(originFieldIds, updatedFieldIds);

  // 2. Remove Relations that contains deleted fields
  const relationsWithoutDeletedFields =
    removeRelationsThatContainsDeletedFields(relations, deletedFields);

  return relationsWithoutDeletedFields;
};

// Pending unit test support for prune relations
// # 96
// https://github.com/Lemoncode/mongo-modeler/issues/96
export const updateTable = (
  table: TableVm,
  dbSchema: DatabaseSchemaVm
): DatabaseSchemaVm =>
  produce(dbSchema, draft => {
    const tableIndex = draft.tables.findIndex(t => t.id === table.id);
    if (tableIndex !== -1) {
      // Prune orphan relations
      draft.relations = pruneOrphanRelationsLogic(
        { originTable: draft.tables[tableIndex], updatedTable: table },
        draft.relations
      );

      // Update table content with new values
      draft.tables[tableIndex] = table;
    }
  });

export const addNewTable = (
  table: TableVm,
  databaseSchema: DatabaseSchemaVm
): DatabaseSchemaVm =>
  produce(databaseSchema, draft => {
    draft.tables.push(table);
  });

export const updateRelation = (
  relation: RelationVm,
  dbSchema: DatabaseSchemaVm
): DatabaseSchemaVm =>
  produce(dbSchema, draft => {
    const index = draft.relations.findIndex(r => r.id === relation.id);

    if (index !== -1) {
      draft.relations[index] = relation;
    }
  });
