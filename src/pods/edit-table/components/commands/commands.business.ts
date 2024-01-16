import { GUID } from '@/core/model';
import { FieldVm } from '../../edit-table.vm';

export const isLastItemInArray = (fields: FieldVm[], fieldId: GUID): boolean =>
  fields[fields.length - 1].id === fieldId;

export const isFirstItemInArray = (fields: FieldVm[], fieldId: GUID): boolean =>
  fields[0].id === fieldId;
