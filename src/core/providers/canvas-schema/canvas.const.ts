const FONT_SIZE = 14;
const ROW_PADDING = 10;
const LEVEL_INDENTATION = 20; // Indentation per level in nested view
const COLLAPSE_ICON_X = 5; // X position of the collapse icon
const FIELD_NAME_X_OFFSET = 20; // Initial X offset for the field name
const FIELD_TYPE_X = 160; // X position for the field type
const DEFAULT_TABLE_WIDTH = 380; // Default width of the table rectangle
const HEADER_HEIGHT = FONT_SIZE + ROW_PADDING + 1; // Height of the table header
const ROW_HEIGHT = FONT_SIZE + ROW_PADDING; // Height of the table line
const HORIZONTAL_LEFT_EXTENSION = 20; // Horizontal extension for the relation line 1:1
const HEADER_TITLE_GAP = 15;
const CANVAS_PADDING = 100; // Represents the additional space around the canvas, we use it to add a space for the tables when we export the schema
const MAX_PLACEMENT_ATTEMPTS = 20; // Maximum number of attempts to place a table without overlapping
const TABLE_SHIFT_DISTANCE = 30; // Distance to shift the table when it overlaps with another table

export const TABLE_CONST = {
  FONT_SIZE,
  ROW_PADDING,
  LEVEL_INDENTATION,
  COLLAPSE_ICON_X,
  FIELD_NAME_X_OFFSET,
  FIELD_TYPE_X,
  DEFAULT_TABLE_WIDTH,
  HEADER_HEIGHT,
  ROW_HEIGHT,
  HORIZONTAL_LEFT_EXTENSION,
  HEADER_TITLE_GAP,
  CANVAS_PADDING,
  MAX_PLACEMENT_ATTEMPTS,
  TABLE_SHIFT_DISTANCE,
};
