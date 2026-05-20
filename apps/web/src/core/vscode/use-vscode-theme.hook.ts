import {
  HOST_MESSAGE_TYPE,
  type ThemePayload,
} from '@lemoncode/mongo-modeler-bridge-protocol';
import { useEffect } from 'react';
import { isVSCodeEnv } from './env.helpers';
import { onMessage } from './vscode-bridge.helpers';

const CSS_VAR_MAP: Record<keyof ThemePayload, readonly string[]> = {
  background: ['--bg-canvas', '--background-800', '--background-900'],
  backgroundSecondary: [
    '--bg-toolbar',
    '--bg-table',
    '--bg-input',
    '--background-700',
    '--background-400',
  ],
  foreground: ['--text-color'],
};

const applyTheme = (theme: ThemePayload): void => {
  const root = document.documentElement;
  for (const [key, cssVars] of Object.entries(CSS_VAR_MAP)) {
    const value = theme[key as keyof ThemePayload];
    if (!value) continue;
    for (const cssVar of cssVars) {
      root.style.setProperty(cssVar, value);
    }
  }
  if (theme.background) document.body.style.backgroundColor = theme.background;
  if (theme.foreground) document.body.style.color = theme.foreground;
};

export const useVSCodeTheme = (): void => {
  useEffect(() => {
    if (!isVSCodeEnv()) return;
    return onMessage(HOST_MESSAGE_TYPE.THEME, applyTheme);
  }, []);
};
