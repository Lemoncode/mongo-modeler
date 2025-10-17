import { useModalDialogContext } from '@/core/providers/modal-dialog-provider';
import { useCanvasViewSettingsContext } from '@/core/providers';
import {
  TableVm,
  useCanvasSchemaContext,
} from '@/core/providers/canvas-schema';
import { IMPORT_COLLECTION_TITLE } from '@/common/components/modal-dialog';
import { ImportIcon } from '@/common/components/icons/import-icon.component';
import { ImportPanel } from '@/pods/import-collection/import-panel.pod';
import { ActionButton } from '@/common/components/action-button';
import { SHORTCUTS } from '@/common/shortcut';

const BORDER_MARGIN = 40;

export const ImportButton = () => {
  const { openModal, closeModal } = useModalDialogContext();
  const { canvasSchema, addTable } = useCanvasSchemaContext();
  const { canvasViewSettings, setLoadSample } = useCanvasViewSettingsContext();

  const handleAddTable = (newTable: TableVm) => {
    const updatedTable = {
      ...newTable,
      x: canvasViewSettings.scrollPosition.x + BORDER_MARGIN,
      y: canvasViewSettings.scrollPosition.y + BORDER_MARGIN,
    };

    addTable(updatedTable);
    closeModal();
  };

  const handleImportClick = () => {
    setLoadSample(false);
    openModal(
      <ImportPanel
        relations={canvasSchema.relations}
        onSave={handleAddTable}
        onClose={handleCloseModal}
      />,
      IMPORT_COLLECTION_TITLE
    );
  };
  const handleCloseModal = () => {
    closeModal();
  };

  return (
    <ActionButton
      icon={<ImportIcon />}
      label={'Import JSON'}
      onClick={handleImportClick}
      className="hide-mobile"
      shortcutOptions={SHORTCUTS.import}
    />
  );
};
