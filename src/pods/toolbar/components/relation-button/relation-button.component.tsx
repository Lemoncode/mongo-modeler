import { useModalDialogContext } from '@/core/providers/modal-dialog-provider';
import { EditRelation } from '@/pods/edit-realtion';
import { Relation } from '@/common/components/icons';
import { ToolbarButton } from '@/pods/toolbar/components/toolbar-button';
import classes from '@/pods/toolbar/toolbar.pod.module.css';
import { EDDIT_RELATION_TITLE } from '@/common/components';

export const RelationButton = () => {
  const { openModal } = useModalDialogContext();
  const handleRelationClick = () => {
    openModal(<EditRelation />, EDDIT_RELATION_TITLE);
  };

  return (
    <ToolbarButton
      icon={<Relation />}
      label="Relation"
      onClick={handleRelationClick}
      className={classes.button}
    />
  );
};
