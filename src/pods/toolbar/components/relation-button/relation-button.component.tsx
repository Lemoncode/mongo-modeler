import { useModalDialogContext } from '@/core/providers/modal-dialog-provider';
import { EditRelationPod } from '@/pods/edit-realtion';
import { Relation } from '@/common/components/icons';
import { ToolbarButton } from '@/pods/toolbar/components/toolbar-button';
import classes from '@/pods/toolbar/toolbar.pod.module.css';
import { EDIT_RELATION_TITLE } from '@/common/components';

export const RelationButton = () => {
  const { openModal } = useModalDialogContext();
  const { canvasViewSettings, setCanvasSize } = useCanvasViewSettingsContext();

  const handleChangeSettings = (size: Size) => {
    setCanvasSize(size);
    closeModal();
  };

  const handleRelationClick = () => {
    openModal(<EditRelationPod />, EDIT_RELATION_TITLE);
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
