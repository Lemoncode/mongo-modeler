import { Add } from '@/common/components/icons/add-icon.component';
import { CommandIconButton } from './command-icon-button';
import { AddFolder } from '@/common/components/icons/add-folder.component';
import { RemoveIcon } from '@/common/components/icons/remove-icon.component';
import { FieldVm } from '../../edit-table.vm';
import { GUID } from '@/core/model';
import { DownIcon } from '@/common/components/icons/down-icon';
import { UpIcon } from '@/common/components/icons/up-icon.component';
import { isFirstItemInArray, isLastItemInArray } from './commands.business';

interface Props {
  onDeleteField: (fieldId: GUID) => void;
  onAddField: (fieldId: GUID, isChildren: boolean) => void;
  field: FieldVm;
  fields: FieldVm[];
  onMoveDownField: (fieldId: GUID) => void;
  onMoveUpField: (fieldId: GUID) => void;
  DeleteIsVisible: boolean;
}

export const Commands: React.FC<Props> = (props: Props) => {
  const {
    field,
    fields,
    onDeleteField,
    onAddField,
    onMoveDownField,
    onMoveUpField,
    DeleteIsVisible,
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
      {DeleteIsVisible && (
        <CommandIconButton
          icon={<RemoveIcon />}
          onClick={() => onDeleteField(field.id)}
        />
      )}
      <CommandIconButton
        icon={<UpIcon />}
        onClick={() => onMoveUpField(field.id)}
        disabled={isFirstItemInArray(fields, field.id)}
      />
      <CommandIconButton
        icon={<DownIcon />}
        onClick={() => onMoveDownField(field.id)}
        disabled={isLastItemInArray(fields, field.id)}
      />
    </>
  );
};
