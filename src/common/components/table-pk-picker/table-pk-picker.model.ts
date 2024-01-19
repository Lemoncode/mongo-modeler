import { GUID } from '@/core/model';

export interface PkOptionVm {
  id: GUID;
  label: string;
  children?: PkOptionVm[];
}
