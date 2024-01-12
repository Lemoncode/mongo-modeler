import { DropdownOptionVm } from '@/common/components';
import { DatabaseSchemaVm } from '@/core/providers/canvas-schema';

export const mapRelationsTipeToDropdonwVm = (): DropdownOptionVm[] => [
  { id: '1', label: '1:1' },
  { id: '2', label: '1:M' },
  { id: '3', label: 'M:1' },
];

// TODO:
// #91
//https://github.com/Lemoncode/mongo-modeler/issues/91
export const mapTablesToDropdonwVm = (
  canvasSchema: DatabaseSchemaVm
): DropdownOptionVm[] =>
  canvasSchema.tables.map(
    (table): DropdownOptionVm => ({ id: table.id, label: table.tableName })
  );
