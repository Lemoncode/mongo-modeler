import { Add } from '@/common/components/icons/add-icon.component';
import { CommandIconButton } from './command-icon-button';
import { FieldVm } from '../../edit-table.vm';
import { GUID, GenerateGUID } from '@/core/model';
import { isFirstItemInArray, isLastItemInArray } from './commands.business';
import { AddFolder, UpIcon, DownIcon, RemoveIcon } from '@/common/components';

interface Props {
  onDeleteField: (fieldId: GUID) => void;
  onAddField: (fieldId: GUID, isChildren: boolean, newfieldId: GUID) => void;
  field: FieldVm;
  fields: FieldVm[];
  onMoveDownField: (fieldId: GUID) => void;
  onMoveUpField: (fieldId: GUID) => void;
  isDeleteVisible: boolean;
}

export const Commands: React.FC<Props> = (props: Props) => {
  const {
    field,
    fields,
    onDeleteField,
    onAddField,
    onMoveDownField,
    onMoveUpField,
    isDeleteVisible,
  } = props;

  return (
    <>
      <CommandIconButton
        icon={<Add />}
        onClick={() => onAddField(field.id, false, GenerateGUID())}
      />
      {field.type === 'object' && (
        <CommandIconButton
          icon={<AddFolder />}
          onClick={() => onAddField(field.id, true, GenerateGUID())}
        />
      )}
      {isDeleteVisible && (
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
