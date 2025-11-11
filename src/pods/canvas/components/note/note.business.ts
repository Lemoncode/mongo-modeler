import { NOTE_COMPONENT_CONST } from './note.const';

const CHAR_WIDTH = 7.3; // Approximate character width in pixels

export const calculateNoteAutoHeight = (
  description: string,
  width: number
): number => {
  if (!description || description.trim() === '') {
    return NOTE_COMPONENT_CONST.MIN_NOTE_HEIGHT;
  }

  // Split by newlines to respect explicit line breaks
  const lines = description.split('\n');

  const availableWidth = width - NOTE_COMPONENT_CONST.PADDING_X * 2;
  const charsPerLine = Math.floor(availableWidth / CHAR_WIDTH);

  if (charsPerLine <= 0) {
    return NOTE_COMPONENT_CONST.MIN_NOTE_HEIGHT;
  }

  // Count total lines
  let totalLines = 0;
  lines.forEach(line => {
    if (line.length === 0) {
      // Empty line
      totalLines += 1;
    } else {
      // Calculate how many wrapped lines this line needs
      totalLines += Math.ceil(line.length / charsPerLine);
    }
  });

  const textHeight = totalLines * NOTE_COMPONENT_CONST.LINE_HEIGHT;
  const calculatedHeight =
    NOTE_COMPONENT_CONST.TITLE_HEIGHT +
    NOTE_COMPONENT_CONST.PADDING_Y * 2 +
    textHeight;

  return Math.max(
    NOTE_COMPONENT_CONST.MIN_NOTE_HEIGHT,
    Math.min(NOTE_COMPONENT_CONST.MAX_NOTE_HEIGHT, calculatedHeight)
  );
};
