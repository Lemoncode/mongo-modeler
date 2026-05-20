import { type DatabaseSchemaVm } from '@/core/providers';
import { mapSchemaToLatestVersion } from '@/core/providers/canvas-schema/canvas-schema.mapper';

export const deserializeSchema = (data: unknown): DatabaseSchemaVm =>
  mapSchemaToLatestVersion(data);

export const serializeSchema = (schema: DatabaseSchemaVm): string =>
  JSON.stringify(schema, null, 2);
