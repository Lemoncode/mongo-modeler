import { describe, it, expect } from 'vitest';
import { calculateNoteAutoHeight } from './note.business';
import { NOTE_COMPONENT_CONST } from './note.const';

describe('calculateNoteAutoHeight', () => {
  const {
    TITLE_CONTAINER_HEIGHT,
    PADDING_Y,
    LINE_HEIGHT,
    MIN_NOTE_WIDTH,
    MIN_NOTE_HEIGHT,
    MAX_NOTE_HEIGHT,
  } = NOTE_COMPONENT_CONST;

  describe('Edge cases', () => {
    it('should return MIN_NOTE_HEIGHT for empty string', () => {
      const result = calculateNoteAutoHeight('', MIN_NOTE_WIDTH);

      expect(result).toBe(MIN_NOTE_HEIGHT);
    });
  });

  describe('Essential scenarios', () => {
    it('should return MIN_NOTE_HEIGHT for short single line text', () => {
      const description = 'Short note';

      const result = calculateNoteAutoHeight(description, MIN_NOTE_WIDTH);

      expect(result).toBe(MIN_NOTE_HEIGHT);
    });

    it('should calculate correct height for multiple lines with newlines', () => {
      const description = 'First line\nSecond line\nThird line';
      const expectedHeight =
        TITLE_CONTAINER_HEIGHT + PADDING_Y * 2 + LINE_HEIGHT * 3;

      const result = calculateNoteAutoHeight(description, MIN_NOTE_WIDTH);

      expect(result).toBe(expectedHeight);
    });

    it('should respect empty lines (paragraph separation)', () => {
      const description = 'Paragraph 1\n\nParagraph 2';
      const expectedHeight =
        TITLE_CONTAINER_HEIGHT + PADDING_Y * 2 + LINE_HEIGHT * 3;

      const result = calculateNoteAutoHeight(description, MIN_NOTE_WIDTH);

      expect(result).toBe(expectedHeight);
    });

    it('should constrain to MAX_NOTE_HEIGHT for very long text', () => {
      const longText = 'Line\n'.repeat(20);

      const result = calculateNoteAutoHeight(longText, MIN_NOTE_WIDTH);

      expect(result).toBe(MAX_NOTE_HEIGHT);
    });
  });
});
