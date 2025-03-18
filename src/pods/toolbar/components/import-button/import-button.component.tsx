import { ToolbarButton } from '../toolbar-button/toolbarButton.component';
import { SHORTCUTS } from '../../shortcut/shortcut.const';
import { ImportIcon } from '@/common/components/icons/import-icon.component';
import classes from '@/pods/toolbar/toolbar.pod.module.css';

export const ImportButton = () => {
  const handleImportClick = () => {
    console.log('Hola');
  };

  return (
    <ToolbarButton
      icon={<ImportIcon />}
      label="Import"
      onClick={handleImportClick}
      className={`${classes.button} hide-mobile`}
      shortcutOptions={SHORTCUTS.import}
    />
  );
};
