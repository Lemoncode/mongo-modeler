import { useModalDialogContext } from '@/core/providers/modal-dialog-provider';
import { EditRelation } from '@/pods/edit-realtion';
import { Relation } from '@/common/components/icons';
import { ToolbarButton } from '@/pods/toolbar/components/toolbar-button';
import classes from '@/pods/toolbar/toolbar.pod.module.css';
import { EDIT_RELATION_TITLE } from '@/common/components';

export const RelationButton = () => {
  const { openModal } = useModalDialogContext();
  const handleRelationClick = () => {
    openModal(<EditRelation />, EDIT_RELATION_TITLE);
  };

  return (
    <ToolbarButton
      icon={<Relation />}
      label="Add Relation"
      onClick={handleRelationClick}
      className={classes.button}
    />
  );
};
