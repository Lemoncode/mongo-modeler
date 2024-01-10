import { GUID } from '@/core/model';

export interface OptionVm {
  id: GUID;
  label: string;
  children?: OptionVm[];
}
