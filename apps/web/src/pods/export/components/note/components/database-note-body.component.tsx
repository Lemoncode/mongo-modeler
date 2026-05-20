import React from 'react';
import { NOTE_COMPONENT_CONST } from '@/pods/canvas/components/note';
import { exportStylesVariables } from '../../../export-variables.const';

interface Props {
  description: string;
  width: number;
  height: number;
}

export const DatabaseNoteBody: React.FC<Props> = ({
  description,
  width,
  height,
}) => {
  return (
    <g>
      {/* Body background */}
      <rect
        x="0"
        y={NOTE_COMPONENT_CONST.TITLE_CONTAINER_HEIGHT}
        width={width}
        height={height}
        style={{ fill: `${exportStylesVariables.NOTE_BACKGROUND}` }}
      />

      {/* Body text */}
      <foreignObject
        x={NOTE_COMPONENT_CONST.PADDING_X}
        y={
          NOTE_COMPONENT_CONST.TITLE_CONTAINER_HEIGHT +
          NOTE_COMPONENT_CONST.PADDING_Y
        }
        width={width - NOTE_COMPONENT_CONST.PADDING_X * 2}
        height={height - NOTE_COMPONENT_CONST.PADDING_Y * 2}
      >
        <div
          // xmlns required for foreignObject HTML content in exported SVG
          // TypeScript doesn't recognize xmlns as valid div prop, so we use 'as any' to bypass type checking.
          {...({ xmlns: 'http://www.w3.org/1999/xhtml' } as any)}
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 11,
            wordWrap: 'break-word',
            wordBreak: 'break-word',
            fontSize: '14px',
            lineHeight: '1.5',
            color: `${exportStylesVariables.TEXT_COLOR}`,
            whiteSpace: 'pre-wrap',
            fontFamily: "'Arial', sans-serif",
          }}
        >
          {description}
        </div>
      </foreignObject>
    </g>
  );
};
