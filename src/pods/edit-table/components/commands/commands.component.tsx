import { Add } from '@/common/components/icons/add-icon.component';
import { CommandIconButton } from './command-icon-button';
import { AddFolder } from '@/common/components/icons/add-folder.component';
import { RemoveIcon } from '@/common/components/icons/remove-icon.component';
import { FieldVm } from '../../edit-table.vm';
import { GUID } from '@/core/model';

interface Props {
  onDeleteField: (fieldId: GUID) => void;
  onAddField: (fieldId: GUID, isChildren: boolean) => void;
  field: FieldVm;
}

export const Commands: React.FC<Props> = (props: Props) => {
  const { field, onDeleteField, onAddField } = props;
  return (
    <>
      <CommandIconButton
        icon={<Add />}
        onClick={() => onAddField(field.id, false)}
      />
      {field.type === 'object' && (
        <CommandIconButton
          icon={<AddFolder />}
          onClick={() => onAddField(field.id, true)}
        />
      )}
      <CommandIconButton
        icon={<RemoveIcon />}
        onClick={() => onDeleteField(field.id)}
      />
    </>
  );
};
