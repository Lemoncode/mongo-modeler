import { Add } from '@/common/components/icons/add-icon.component';
import { CommandIconButton } from './command-icon-button';
import { FieldVm } from '../../manage-index.vm';
import { GUID, GenerateGUID } from '@/core/model';
import { TrashIcon } from '@/common/components';

interface Props {
  onDeleteIndex: (indexId: GUID) => void;
  onAddIndex: (fieldId: GUID, isChildren: boolean, newfieldId: GUID) => void;
  index: FieldVm;
  indexes: FieldVm[];
  onMoveDown: (indexId: GUID) => void;
  onMoveUp: (indexId: GUID) => void;
  isDeleteVisible: boolean;
  labelAddIndex?: string;
}

const REMOVE_ICON = 'Remove';
const ADD = 'Add Index';

export const Commands: React.FC<Props> = (props: Props) => {
  const {
    index: index,
    onDeleteIndex: onDeleteIndex,
    onAddIndex: onAddIndex,
    isDeleteVisible,
    labelAddIndex: labelAddIndex,
  } = props;

  return (
    <>
      <CommandIconButton
        icon={<Add />}
        onClick={() => onAddIndex(index.id, false, GenerateGUID())}
        ariaLabel={labelAddIndex || ADD}
      />
      {isDeleteVisible && (
        <CommandIconButton
          icon={<TrashIcon />}
          onClick={() => onDeleteIndex(index.id)}
          ariaLabel={REMOVE_ICON + index.name}
        />
      )}
    </>
  );
};
