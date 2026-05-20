import * as vscode from 'vscode';
import { registerNewDiagramCommand } from './new-diagram';

export const registerCommands = (context: vscode.ExtensionContext): void => {
  registerNewDiagramCommand(context);
};
