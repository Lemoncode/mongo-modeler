import { NOTE_COMPONENT_CONST } from './note.const';

const CHAR_WIDTH = 8; // Approximate character width in pixels

export const calculateNoteAutoHeight = (
  description: string,
  width: number
): number => {
  if (!description || description.trim() === '') {
    return NOTE_COMPONENT_CONST.MIN_NOTE_HEIGHT;
  }

  // Calculate available width for text
  const availableWidth = width - NOTE_COMPONENT_CONST.PADDING_X * 2;
  const charsPerLine = Math.floor(availableWidth / CHAR_WIDTH);

  if (charsPerLine <= 0) {
    return NOTE_COMPONENT_CONST.MIN_NOTE_HEIGHT;
  }

  // Estimate number of lines by splitting text into words
  const words = description.split(/\s+/);
  let currentLineLength = 0;
  let lineCount = 1;

  words.forEach(word => {
    const wordLength = word.length;

    if (currentLineLength + wordLength > charsPerLine) {
      // Word doesn't fit on current line, move to next line
      lineCount++;
      currentLineLength = wordLength + 1;
    } else {
      // Word fits on current line
      currentLineLength += wordLength + 1;
    }
  });

  // Calculate height: title + padding + text lines + padding
  const textHeight = lineCount * NOTE_COMPONENT_CONST.LINE_HEIGHT;
  const calculatedHeight =
    NOTE_COMPONENT_CONST.TITLE_HEIGHT +
    NOTE_COMPONENT_CONST.PADDING_Y * 2 +
    textHeight;

  // Constrain to min/max (100px - 300px)
  return Math.max(
    NOTE_COMPONENT_CONST.MIN_NOTE_HEIGHT,
    Math.min(NOTE_COMPONENT_CONST.MAX_NOTE_HEIGHT, calculatedHeight)
  );
};
