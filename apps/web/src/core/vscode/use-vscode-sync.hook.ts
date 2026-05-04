import { useVSCodeAutoSave } from './use-vscode-auto-save.hook';
import { useVSCodeFileLoad } from './use-vscode-file-load.hook';

/**
 * Wires the VS Code webview bridge. The inner hooks no-op when not running
 * inside a VS Code webview, so this can be called unconditionally.
 */
export const useVSCodeSync = (): void => {
  const hasReceivedFileRef = useVSCodeFileLoad();
  useVSCodeAutoSave(hasReceivedFileRef);
};
