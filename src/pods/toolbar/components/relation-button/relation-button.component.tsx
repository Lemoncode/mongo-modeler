import { useModalDialogContext } from '@/core/providers/modal-dialog-provider';
import { EditRelationPod } from '@/pods/edit-relation';
import { Relation } from '@/common/components/icons';
import { ToolbarButton } from '@/pods/toolbar/components/toolbar-button';
import classes from '@/pods/toolbar/toolbar.pod.module.css';
import { EDIT_RELATION_TITLE } from '@/common/components';
import {
  RelationVm,
  useCanvasSchemaContext,
} from '@/core/providers/canvas-schema';
import { SHORTCUTS } from '../../shortcut/shortcut.const';

export const RelationButton = () => {
  const { openModal, closeModal } = useModalDialogContext();
  const { canvasSchema, addRelation } = useCanvasSchemaContext();

  const handleChangeCanvasSchema = (relation: RelationVm) => {
    addRelation(relation);
    closeModal();
  };
  const handleCloseEditRelation = () => {
    closeModal();
  };

  const handleRelationClick = () => {
    openModal(
      <EditRelationPod
        onChangeRelation={handleChangeCanvasSchema}
        canvasSchema={canvasSchema}
        onClose={handleCloseEditRelation}
      />,
      EDIT_RELATION_TITLE
    );
  };

  return (
    <ToolbarButton
      icon={<Relation />}
      label="Add Relation"
      onClick={handleRelationClick}
      className={classes.button}
      shortcutOptions={SHORTCUTS.addRelation}
      disabled={canvasSchema.tables.length < 1}
    />
  );
};
