import { useModalDialogContext } from '@/core/providers/modal-dialog-provider';
import { EditRelationPod } from '@/pods/edit-relation';
import { Relation } from '@/common/components/icons';
import { ADD_RELATION_TITLE } from '@/common/components';
import {
  RelationVm,
  useCanvasSchemaContext,
} from '@/core/providers/canvas-schema';
import { ActionButton } from '@/common/components/action-button';
import { SHORTCUTS } from '@/common/shortcut';
import classes from '../floating-bar-components.module.css';

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
      ADD_RELATION_TITLE
    );
  };

  return (
    <ActionButton
      icon={<Relation />}
      label="Add Relation"
      onClick={handleRelationClick}
      className={`${classes.button} hide-mobile relation-button`}
      shortcutOptions={SHORTCUTS.addRelation}
      disabled={canvasSchema.tables.length < 1}
      showLabel={false}
      tooltipPosition="top"
    />
  );
};
