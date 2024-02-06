import { Add } from '@/common/components/icons/add-icon.component';
import { CommandIconButton } from './command-icon-button';
import { FieldVm } from '../../edit-table.vm';
import { GUID } from '@/core/model';
import { isFirstItemInArray, isLastItemInArray } from './commands.business';
import {
  DragDropIcon,
  AddFolder,
  UpIcon,
  DownIcon,
  RemoveIcon,
} from '@/common/components';

interface Props {
  onDeleteField: (fieldId: GUID) => void;
  onAddField: (fieldId: GUID, isChildren: boolean) => void;
  field: FieldVm;
  fields: FieldVm[];
  onMoveDownField: (fieldId: GUID) => void;
  onMoveUpField: (fieldId: GUID) => void;
  onDrag: (e: React.PointerEvent<HTMLButtonElement>, field: FieldVm) => void;
}

export const Commands: React.FC<Props> = (props: Props) => {
  const {
    field,
    fields,
    onDeleteField,
    onAddField,
    onMoveDownField,
    onMoveUpField,
    onDrag,
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
      <CommandIconButton
        icon={<DragDropIcon />}
        onPointerDown={e => onDrag(e, field)}
      />
    </>
  );
};
