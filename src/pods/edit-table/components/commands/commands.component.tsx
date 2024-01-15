import { Add } from '@/common/components/icons/add-icon.component';
import { CommandIconButton } from './command-icon-button';
import { AddFolder } from '@/common/components/icons/add-folder.component';
import { RemoveIcon } from '@/common/components/icons/remove-icon.component';
import { FieldVm } from '../../edit-table.vm';
import { GUID } from '@/core/model';
import { DownIcon } from '@/common/components/icons/down-icon';
import { UpIcon } from '@/common/components/icons/up-icon.component';

interface Props {
  onDeleteField: (fieldId: GUID) => void;
  onAddField: (fieldId: GUID, isChildren: boolean) => void;
  field: FieldVm;
  fields: FieldVm[];
  onMoveDownField: (fieldId: GUID) => void;
  onMoveUpField: (fieldId: GUID) => void;
}

export const Commands: React.FC<Props> = (props: Props) => {
  const {
    field,
    fields,
    onDeleteField,
    onAddField,
    onMoveDownField,
    onMoveUpField,
  } = props;
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
      {fields[fields.length - 1].id !== field.id ? (
        <CommandIconButton
          icon={<DownIcon />}
          onClick={() => onMoveDownField(field.id)}
        />
      ) : (
        <CommandIconButton
          icon={<DownIcon />}
          onClick={() => onMoveDownField(field.id)}
          disabled={true}
        />
      )}
      {fields[0].id !== field.id ? (
        <CommandIconButton
          icon={<UpIcon />}
          onClick={() => onMoveUpField(field.id)}
        />
      ) : (
        <CommandIconButton
          icon={<UpIcon />}
          onClick={() => onMoveUpField(field.id)}
          disabled={true}
        />
      )}
    </>
  );
};
