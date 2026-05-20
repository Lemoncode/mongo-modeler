import { MONGO_MODELER_NEW_DIAGRAM_COMMAND_ID } from '#commands';
import * as vscode from 'vscode';
import {
  ITEM_COLOR_THEME_TOKEN,
  ITEM_TEXT,
  ITEM_TOOLTIP,
  STATUS_BAR_PRIORITY,
} from './new-diagram.consts';

export const registerNewDiagramStatusBarItem = (
  context: vscode.ExtensionContext
): void => {
  const item = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Left,
    STATUS_BAR_PRIORITY
  );
  item.text = ITEM_TEXT;
  item.tooltip = ITEM_TOOLTIP;
  item.color = new vscode.ThemeColor(ITEM_COLOR_THEME_TOKEN);
  item.command = MONGO_MODELER_NEW_DIAGRAM_COMMAND_ID;
  item.show();

  context.subscriptions.push(item);
};
