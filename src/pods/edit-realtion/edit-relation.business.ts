import { DropdownOptionVm } from '@/common/components';
import { DatabaseSchemaVm } from '@/core/providers/canvas-schema';

export const mapRelationsTipeToDropdonwVm = (): DropdownOptionVm[] => [
  { id: '1', label: '1:1' },
  { id: '2', label: '1:M' },
  { id: '3', label: 'M:1' },
];

//Test, it's possible that it arrives empty?
export const mapTablesToDropdonwVm = (
  canvasSchema: DatabaseSchemaVm
): DropdownOptionVm[] =>
  canvasSchema.tables.map(
    (table): DropdownOptionVm => ({ id: table.id, label: table.tableName })
  );
