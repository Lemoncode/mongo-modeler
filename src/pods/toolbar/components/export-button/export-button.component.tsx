import { ToolbarButton } from '../toolbar-button/toolbarButton.component';
import { ExportIcon } from '@/common/components/icons/export-icon.component';
import { EDIT_COLLECTION_TITLE } from '@/common/components';
import { useModalDialogContext } from '@/core/providers/modal-dialog-provider';
import { ExportTablePod } from '@/pods/export/export-table.pod';
import classes from '@/pods/toolbar/toolbar.pod.module.css';
import { ExportType } from '@/core/model';

export const ExportButton = () => {
  const { openModal } = useModalDialogContext();

  const handleExportToFormat = (exportType: ExportType) => {
    console.log('exportType', exportType);
  };

  const handleExportClick = () => {
    openModal(
      <ExportTablePod onExport={handleExportToFormat} />,
      EDIT_COLLECTION_TITLE
    );
  };

  return (
    <ToolbarButton
      icon={<ExportIcon />}
      label="Export"
      onClick={handleExportClick}
      className={classes.button}
    />
  );
};
