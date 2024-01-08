import { useModalDialogContext } from '@/core/providers/modal-dialog-provider';
import { EditTable } from '@/pods/edit-table';
import { ToolbarButton } from '../toolbar-button/toolbarButton.component';
import { Edit } from '@/common/components/icons';
import classes from '@/pods/toolbar/toolbar.pod.module.css';

export const EditButton = () => {
  const { openModal } = useModalDialogContext();

  const handleEditTableClick = () => {
    openModal(<EditTable />);
  };
  return (
    <ToolbarButton
      icon={<Edit />}
      label="Edit"
      onClick={handleEditTableClick}
      className={classes.button}
    />
  );
};
