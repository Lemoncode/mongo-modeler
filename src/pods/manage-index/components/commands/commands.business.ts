import { GUID } from '@/core/model';
import { FieldVm } from '../../manage-index.vm';

export const isLastItemInArray = (array: FieldVm[], id: GUID): boolean =>
  array[array.length - 1].id === id;

export const isFirstItemInArray = (array: FieldVm[], id: GUID): boolean =>
  array[0].id === id;
