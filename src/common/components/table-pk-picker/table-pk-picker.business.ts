import { GUID } from '@/core/model';
import { PkOptionVm } from './table-pk-picker.model';

export const generateLabel = (
  options: PkOptionVm[],
  valueId: GUID,
  ruta: string[]
): string | undefined => {
  for (const option of options) {
    const labelRoute = [...ruta, option.label];

    if (option.id === valueId) {
      return labelRoute.join(' > ');
    }
    if (option.children) {
      const findOptionLabel = generateLabel(
        option.children,
        valueId,
        labelRoute
      );
      if (findOptionLabel) {
        return findOptionLabel;
      }
    }
  }
  return undefined;
};
