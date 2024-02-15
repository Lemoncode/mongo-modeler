import React, { Dispatch, SetStateAction } from 'react';
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

function useStateWithInterceptor<S>(
  initialState: S | (() => S),
  schemaInterceptorFn: (schema: S) => void
): [S, Dispatch<SetStateAction<S>>, Dispatch<SetStateAction<S>>] {
  const [canvasSchema, setInternalCanvasSchema] =
    React.useState<S>(initialState);

  const setSchema = (newSchema: React.SetStateAction<S>): void => {
    // If newSchema is a function, use it to calculate the new state based on the current state
    // Otherwise, use newSchema directly
    const updatedSchema =
      newSchema instanceof Function ? newSchema(canvasSchema) : newSchema;

    schemaInterceptorFn(updatedSchema);

    return setInternalCanvasSchema(newSchema);
  };

  const setSchemaSkipInterceptor = (
    newSchema: React.SetStateAction<S>
  ): void => {
    return setInternalCanvasSchema(newSchema);
  };

  return [canvasSchema, setSchema, setSchemaSkipInterceptor];
}

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
    setSchema(latestVersionSchema);
  };

  const createEmptySchema = () => {
    setSchema(createDefaultDatabaseSchemaVm());
  };

  const updateFullTable = (table: TableVm) => {
    setSchema(prevSchema => updateTable(table, prevSchema));
  };

  // TODO: #56 created to track this
  // https://github.com/Lemoncode/mongo-modeler/issues/56
  const addTable = (table: TableVm) => {
    setSchema(prevSchema => addNewTable(table, prevSchema));
  };

  // TODO: #90
  //https://github.com/Lemoncode/mongo-modeler/issues/90
  const addRelation = (relation: RelationVm) => {
    if (!doesRelationAlreadyExists(canvasSchema, relation)) {
      setSchema(prevSchema =>
        produce(prevSchema, draft => {
          draft.relations.push(relation);
        })
      );
    }
  };

  const updateFullRelation = (relationUpdated: RelationVm) => {
    setSchema(prevSchema => updateRelation(relationUpdated, prevSchema));
  };

  const updateTablePosition = (
    itemInfo: UpdatePositionItemInfo,
    isDragFinished: boolean
  ) => {
    const { id, position, totalHeight, canvasSize } = itemInfo;
    isDragFinished
      ? setSchema(prevSchema =>
          moveTableToTop(prevSchema, { id, position, totalHeight }, canvasSize)
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
      deleteItemFromCanvasSchema(currentSchema, selectedElementId)
    );
  };
  return (
    <CanvasSchemaContext.Provider
      value={{
        canvasSchema,
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
