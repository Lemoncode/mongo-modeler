import * as vscode from 'vscode';
import { handleNewDiagram } from './new-diagram.handler';
import { MONGO_MODELER_NEW_DIAGRAM_COMMAND_ID } from './new-diagram.id';

export const registerNewDiagramCommand = (
  context: vscode.ExtensionContext
): void => {
  context.subscriptions.push(
    vscode.commands.registerCommand(
      MONGO_MODELER_NEW_DIAGRAM_COMMAND_ID,
      handleNewDiagram
    )
  );
};
