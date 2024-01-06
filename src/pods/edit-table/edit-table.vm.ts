import { FieldType, GUID } from '@/core/model';

// EditTableVm is different from canvas FK field
// We will need to create a mapper taking into account
// FKs
export interface FieldVm {
  id: GUID;
  PK: boolean;
  FK?: boolean;
  name: string;
  type: FieldType;
  children?: FieldVm[];
  isCollapsed?: boolean;
}
