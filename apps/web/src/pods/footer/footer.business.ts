export const getFileNameCanvasIsPristine = (
  filename: string,
  defaultFileName: string
): string => (filename ? filename : defaultFileName);

export const getFileNameCanvasDirty = (
  filename: string,
  defaultFileName: string,
  asterisk: string
): string =>
  filename ? `${filename} ${asterisk}` : `${defaultFileName} ${asterisk}`;
