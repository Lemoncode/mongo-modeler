import { DatabaseSchemaVm } from './canvas-schema-vlatest.model';
import * as schemaV0 from './canvas-schema-v0.model';

const mapSchemaFromNoVersionToLatestVersion = (
  newSchema: schemaV0.DatabaseSchemaVmV0
): DatabaseSchemaVm => ({ ...newSchema, version: '0.1' });

// TODO: Add unit test to mapSchemaToLatestVersion
// #277
// https://github.com/Lemoncode/mongo-modeler/issues/277
//
// Right now if version is not informed, we just add the 0.1 version
// Later on this will get more complex and we will have to store
// different versions of the schema when we introduce breaking changes
export const mapSchemaToLatestVersion = (newSchema: any) => {
  if (!newSchema.version) {
    return mapSchemaFromNoVersionToLatestVersion(newSchema);
  }

  switch (newSchema.version) {
    case '0.1': // Latest
      return newSchema;
    default:
      return newSchema;
  }
  return newSchema;
};
