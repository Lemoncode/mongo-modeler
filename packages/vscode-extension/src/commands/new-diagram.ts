import { logError } from '#core';
import { writeFile } from '#editor';
import * as vscode from 'vscode';

const VIEW_TYPE = 'mongo-modeler.editor';
const FILE_EXTENSION = 'mml';
const DEFAULT_FILENAME = `untitled.${FILE_EXTENSION}`;

const DEFAULT_DIAGRAM_CONTENT = JSON.stringify(
  {
    version: '0.1',
    tables: [],
    relations: [],
    notes: [],
    selectedElementId: null,
    isPristine: true,
  },
  null,
  2
);

const getDefaultUri = (): vscode.Uri | undefined => {
  const folder = vscode.workspace.workspaceFolders?.[0];
  return folder ? vscode.Uri.joinPath(folder.uri, DEFAULT_FILENAME) : undefined;
};

const createNewDiagram = async (): Promise<void> => {
  const target = await vscode.window.showSaveDialog({
    title: 'New Mongo Modeler diagram',
    defaultUri: getDefaultUri(),
    filters: { 'Mongo Modeler diagram': [FILE_EXTENSION] },
  });
  if (!target) return;

  try {
    await writeFile(target, DEFAULT_DIAGRAM_CONTENT);
    await vscode.commands.executeCommand('vscode.openWith', target, VIEW_TYPE);
  } catch (error) {
    logError('Failed to create new diagram:', error);
    vscode.window.showErrorMessage(
      `Failed to create new Mongo Modeler diagram: ${error instanceof Error ? error.message : String(error)}`
    );
  }
};

export const registerNewDiagramCommand = (
  context: vscode.ExtensionContext
): void => {
  context.subscriptions.push(
    vscode.commands.registerCommand('mongo-modeler.newDiagram', createNewDiagram)
  );
};
