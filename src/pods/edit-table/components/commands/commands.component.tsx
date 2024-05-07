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
  labelAddField?: string;
}

const ADD_FOLDER = 'Add nested field for ';
const REMOVE_ICON = 'Remove';
const ADD = 'Add field';
const UP_ICON = 'Up field';
const DOWN_ICON = 'Down field';

export const Commands: React.FC<Props> = (props: Props) => {
  const {
    field,
    fields,
    onDeleteField,
    onAddField,
    onMoveDownField,
    onMoveUpField,
    isDeleteVisible,
    labelAddField,
  } = props;

  return (
    <>
      <CommandIconButton
        icon={<Add />}
        onClick={() => onAddField(field.id, false, GenerateGUID())}
        ariaLabel={labelAddField || ADD}
      />
      {field.type === 'object' && (
        <CommandIconButton
          icon={<AddFolder />}
          onClick={() => onAddField(field.id, true, GenerateGUID())}
          ariaLabel={ADD_FOLDER + field.name}
        />
      )}
      {isDeleteVisible && (
        <CommandIconButton
          icon={<RemoveIcon />}
          onClick={() => onDeleteField(field.id)}
          ariaLabel={REMOVE_ICON + field.name}
        />
      )}
      <CommandIconButton
        icon={<UpIcon />}
        onClick={() => onMoveUpField(field.id)}
        disabled={isFirstItemInArray(fields, field.id)}
        ariaLabel={UP_ICON + field.name}
      />
      <CommandIconButton
        icon={<DownIcon />}
        onClick={() => onMoveDownField(field.id)}
        disabled={isLastItemInArray(fields, field.id)}
        ariaLabel={DOWN_ICON + field.name}
      />
    </>
  );
};
