import React, { useEffect, useRef, useState } from 'react';
import { GUID, GenerateGUID } from '@/core/model';
import classes from '../database-table.module.css';
import { TABLE_CONST, TableVm, useCanvasSchemaContext } from '@/core/providers';
import { useTableContext } from '@/core/providers/table-provider';

interface Props {
  text: string;
  editText?: (tableId: GUID, fieldId: GUID) => void;
  table?: TableVm;
  x: number;
  y: number;
  width: number;
  height: number;
  textClass?: string;
  isTextInEditMode?: boolean;
}

export const TruncatedText: React.FC<Props> = props => {
  const id = React.useMemo(() => GenerateGUID(), []);
  const { text, table, x, y, width, height, textClass, isTextInEditMode } =
    props;
  const inputRef = useRef<HTMLInputElement>(null);
  const [editableText, setEditableText] = useState(text);
  const { updateTableSingleField } = useCanvasSchemaContext();
  const { setIsTitleInEditMode } = useTableContext();

  const handleInputChange = () => {
    if (inputRef.current) {
      if (table) {
        updateTableSingleField(table, 'tableName', inputRef.current.value);
      }
      setEditableText(inputRef.current.value);
    }
  };

  useEffect(() => {
    if (isTextInEditMode && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isTextInEditMode]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (inputRef.current) {
        setIsTitleInEditMode(false);
      }
    }
  };

  return (
    <>
      <clipPath id={`clip_${id}`}>
        <rect x={x} y={y} width={width} height={height + 10}></rect>
      </clipPath>
      {isTextInEditMode ? (
        <foreignObject
          x={0}
          y={0}
          width={width}
          height={TABLE_CONST.HEADER_HEIGHT}
          style={{
            pointerEvents: 'auto',
            display: 'flex',
            alignItems: 'flex-start',
          }}
        >
          <input
            type="text"
            ref={inputRef}
            value={editableText}
            onChange={handleInputChange}
            className={!textClass ? classes.tableTextRow : textClass}
            onKeyDown={handleKeyDown}
            style={{
              fontSize: '16px',
              color: 'black',
              backgroundColor: 'transparent',
              width: '100%',
              height: '100%',
              boxSizing: 'border-box',
              overflow: 'hidden',
              border: 'none', // Optional: Remove border for a cleaner appearance
            }}
          />
        </foreignObject>
      ) : (
        <text
          x={x}
          y={y + height}
          width={width}
          clipPath={`url(#clip_${id})`}
          className={!textClass ? classes.tableTextRow : textClass}
        >
          {text}
        </text>
      )}
    </>
  );
};
