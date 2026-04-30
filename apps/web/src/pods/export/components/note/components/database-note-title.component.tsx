import React from 'react';
import { NOTE_COMPONENT_CONST } from '@/pods/canvas/components/note';
import { exportStylesVariables } from '../../../export-variables.const';

interface Props {
  title?: string;
  width: number;
}

export const DatabaseNoteTitle: React.FC<Props> = ({ title, width }) => {
  return (
    <>
      {/* Title background */}
      <rect
        x="0"
        y="0"
        width={width}
        height={NOTE_COMPONENT_CONST.TITLE_CONTAINER_HEIGHT}
        style={{ fill: `${exportStylesVariables.NOTE_BACKGROUND}` }}
      />

      {/* Title text - only render if exists */}
      {title && (
        <foreignObject
          x={NOTE_COMPONENT_CONST.PADDING_X}
          y={NOTE_COMPONENT_CONST.PADDING_Y}
          width={
            width -
            NOTE_COMPONENT_CONST.PENCIL_ICON_WIDTH -
            NOTE_COMPONENT_CONST.PENCIL_MARGIN_RIGHT -
            NOTE_COMPONENT_CONST.PADDING_X * 2
          }
          height={NOTE_COMPONENT_CONST.TITLE_TEXT_HEIGHT}
        >
          <div
            // xmlns required for foreignObject HTML content in exported SVG
            // TypeScript doesn't recognize xmlns as valid div prop, so we use 'as any' to bypass type checking.
            {...({ xmlns: 'http://www.w3.org/1999/xhtml' } as any)}
            style={{
              fontFamily: "'Arial', sans-serif",
              fontSize: '14px',
              fontWeight: 'bold',
              color: `${exportStylesVariables.TEXT_COLOR}`,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {title}
          </div>
        </foreignObject>
      )}

      {/* Separator line */}
      <line
        x1="0"
        y1={NOTE_COMPONENT_CONST.TITLE_CONTAINER_HEIGHT}
        x2={width}
        y2={NOTE_COMPONENT_CONST.TITLE_CONTAINER_HEIGHT}
        stroke={exportStylesVariables.NOTE_BORDER}
        strokeWidth="1"
      />
    </>
  );
};
