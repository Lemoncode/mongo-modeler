import React, { useState } from 'react';
import { produce } from 'immer';
import { CanvasSchemaContext } from './canvas-schema.context';
import {
  DatabaseSchemaVm,
  RelationVm,
  TableVm,
  UpdatePositionItemInfo,
  createDefaultDatabaseSchemaVm,
} from './canvas-schema-vlatest.model';
import { GUID } from '@/core/model';
import {
  moveTableToTop,
  doFieldToggleCollapseLogic,
  doesRelationAlreadyExists,
  deleteItemFromCanvasSchema,
} from './canvas.business';
import {
  addNewTable,
  updateRelation,
  updateTable,
} from './canvas-schema.business';
import { useHistoryManager } from '@/common/undo-redo';
import { mapSchemaToLatestVersion } from './canvas-schema.mapper';
import { useStateWithInterceptor } from './canvas-schema.hook';

interface Props {
  children: React.ReactNode;
}

export const CanvasSchemaProvider: React.FC<Props> = props => {
  const { children } = props;
  const {
    addSnapshot,
    canRedo: canRedoLogic,
    canUndo: canUndoLogic,
    redo,
    undo,
    getCurrentState: getCurrentUndoHistoryState,
  } = useHistoryManager(createDefaultDatabaseSchemaVm());

  // TODO: consider moving all these to useReducer (discuss first if needed)
  // #54 created to track this
  // https://github.com/Lemoncode/mongo-modeler/issues/54
  const [canvasSchema, setSchema, setSchemaSkipHistory] =
    useStateWithInterceptor(createDefaultDatabaseSchemaVm(), addSnapshot);

  const loadSchema = (newSchema: DatabaseSchemaVm) => {
    const latestVersionSchema = mapSchemaToLatestVersion(newSchema);
    setSchema({ ...latestVersionSchema, isPristine: true });
  };

  const createEmptySchema = () => {
    setSchema(createDefaultDatabaseSchemaVm());
  };

  const updateFullTable = (table: TableVm) => {
    setSchema(prevSchema =>
      updateTable(table, { ...prevSchema, isPristine: false })
    );
  };

  // TODO: #56 created to track this
  // https://github.com/Lemoncode/mongo-modeler/issues/56
  const addTable = (table: TableVm) => {
    setSchema(prevSchema =>
      addNewTable(table, { ...prevSchema, isPristine: false })
    );
  };

  // TODO: #90
  //https://github.com/Lemoncode/mongo-modeler/issues/90
  const addRelation = (relation: RelationVm) => {
    if (!doesRelationAlreadyExists(canvasSchema, relation)) {
      setSchema(prevSchema =>
        produce({ ...prevSchema, isPristine: false }, draft => {
          draft.relations.push(relation);
        })
      );
    }
  };

  const updateFullRelation = (relationUpdated: RelationVm) => {
    setSchema(prevSchema =>
      updateRelation(relationUpdated, { ...prevSchema, isPristine: false })
    );
  };

  const updateTablePosition = (
    itemInfo: UpdatePositionItemInfo,
    isDragFinished: boolean
  ) => {
    const { id, position, totalHeight, canvasSize } = itemInfo;
    isDragFinished
      ? setSchema(prevSchema =>
          moveTableToTop(
            { ...prevSchema, isPristine: false },
            { id, position, totalHeight },
            canvasSize
          )
        )
      : setSchemaSkipHistory(prevSchema =>
          moveTableToTop(prevSchema, { id, position, totalHeight }, canvasSize)
        );
  };

  // TODO: #57 created to track this
  // https://github.com/Lemoncode/mongo-modeler/issues/57
  const doFieldToggleCollapse = (tableId: GUID, fieldId: GUID): void => {
    setSchemaSkipHistory(currentSchema =>
      doFieldToggleCollapseLogic(currentSchema, tableId, fieldId)
    );
  };

  const doSelectElement = (id: GUID | null) => {
    setSchemaSkipHistory(currentSchema => ({
      ...currentSchema,
      selectedElementId: id,
    }));
  };

  const doUndo = () => {
    if (canUndo()) {
      undo();
      setSchemaSkipHistory(getCurrentUndoHistoryState());
    }
  };

  const doRedo = () => {
    if (canRedo()) {
      redo();
      setSchemaSkipHistory(getCurrentUndoHistoryState());
    }
  };

  const canRedo = () => {
    return canRedoLogic();
  };

  const canUndo = () => {
    return canUndoLogic();
  };

  const deleteSelectedItem = (selectedElementId: GUID) => {
    setSchema(currentSchema =>
      deleteItemFromCanvasSchema(
        { ...currentSchema, isPristine: false },
        selectedElementId
      )
    );
  };

  const switchIsPristine = (isPristine: boolean) => {
    setSchema(currentSchema => ({
      ...currentSchema,
      isPristine,
    }));
  };

  const duplicateSelectedTable = () => {
    setSchema(prevSchema => {
      if (!prevSchema.selectedElementId) return prevSchema;

      const selectedTable = prevSchema.tables.find(
        table => table.id === prevSchema.selectedElementId
      );

      if (!selectedTable) return prevSchema;

      // Create duplicate with new IDs
      const duplicateTable: TableVm = {
        ...selectedTable,
        id: crypto.randomUUID(), // Generate new ID
        x: selectedTable.x + 50, // Offset position
        y: selectedTable.y + 50,
        fields: selectedTable.fields.map(field => ({
          ...field,
          id: crypto.randomUUID(), // New IDs for fields
        })),
      };

      return {
        ...prevSchema,
        tables: [...prevSchema.tables, duplicateTable],
        isPristine: false,
      };
    });
  };

  const [clipboardTable, setClipboardTable] = useState<TableVm | null>(null);
  const [pasteOffset, setPasteOffset] = useState({ x: 0, y: 0 });

  const copySelectedTable = () => {
    const selectedTable = canvasSchema.tables.find(
      table => table.id === canvasSchema.selectedElementId
    );
    if (selectedTable) {
      setClipboardTable(selectedTable);
      setPasteOffset({ x: 0, y: 0 }); // Reset offset on copy
    }
  };

  const pasteTable = () => {
    if (clipboardTable) {
      // Increment offset
      const newOffset = { x: pasteOffset.x + 50, y: pasteOffset.y + 50 };

      const newTable: TableVm = {
        ...clipboardTable,
        id: crypto.randomUUID(),
        x: clipboardTable.x + newOffset.x,
        y: clipboardTable.y + newOffset.y,
        fields: clipboardTable.fields.map(field => ({
          ...field,
          id: crypto.randomUUID(),
        })),
      };

      setSchema(prev => ({
        ...prev,
        tables: [...prev.tables, newTable],
        isPristine: false,
      }));

      setPasteOffset(newOffset);
    }
  };

  return (
    <CanvasSchemaContext.Provider
      value={{
        canvasSchema,
        setCanvasSchema: setSchema,
        createEmptySchema,
        loadSchema,
        updateTablePosition,
        doFieldToggleCollapse,
        updateFullTable,
        addTable,
        addRelation,
        doSelectElement,
        canUndo,
        canRedo,
        doUndo,
        doRedo,
        updateFullRelation,
        deleteSelectedItem,
        switchIsPristine: switchIsPristine,
        duplicateSelectedTable,
        copySelectedTable,
        pasteTable,
        hasClipboardContent: Boolean(clipboardTable),
      }}
    >
      {children}
    </CanvasSchemaContext.Provider>
  );
};

export const useCanvasSchemaContext = () => {
  const context = React.useContext(CanvasSchemaContext);
  if (context === null) {
    throw 'useCanvasSchemaContext: looks like you have forgotten to add the provider on top of the app :)';
  }

  return context;
};
