import { ToolbarButton } from '../toolbar-button/toolbarButton.component';
import { ExportIcon } from '@/common/components/icons/export-icon.component';
import classes from '@/pods/toolbar/toolbar.pod.module.css';

export const ExportButton = () => {
  return (
    <ToolbarButton
      icon={<ExportIcon />}
      label="Export"
      onClick={() => console.log('Here we should show export modal dialog')}
      className={classes.button}
    />
  );
};
