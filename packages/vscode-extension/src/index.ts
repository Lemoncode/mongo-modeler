import { registerCommands } from '#commands';
import { MongoModelerEditorProvider } from '#editor';
import { registerStatusBarItems } from '#status-bar';
import * as vscode from 'vscode';

export const activate = (context: vscode.ExtensionContext) => {
  context.subscriptions.push(MongoModelerEditorProvider.register(context));
  registerCommands(context);
  registerStatusBarItems(context);
};

export const deactivate = () => {};
