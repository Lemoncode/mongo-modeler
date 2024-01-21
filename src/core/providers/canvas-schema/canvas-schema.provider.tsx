import React, { Dispatch, SetStateAction } from 'react';
import { produce } from 'immer';
import { CanvasSchemaContext } from './canvas-schema.context';
import {
  DatabaseSchemaVm,
  RelationVm,
  TableVm,
  createDefaultDatabaseSchemaVm,
} from './canvas-schema.model';
import { Coords, GUID, Size } from '@/core/model';
import {
  moveTableToTop,
  doFieldToggleCollapseLogic,
  doesRelationAlreadyExists,
} from './canvas.business';
import { updateTable } from './canvas-schema.business';
import {
  initializeHistory,
  addSnapshot,
  canUndoLogic,
  canRedoLogic,
  undo,
  redo,
} from '@/core/undo-redo';

//function useState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>];

function useStateWithInterceptor<S>(
  initialState: S | (() => S),
  schemaInterceptorFn: (schema: S) => void
): [S, Dispatch<SetStateAction<S>>] {
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

  return [canvasSchema, setSchema];
}

interface Props {
  children: React.ReactNode;
}

export const CanvasSchemaProvider: React.FC<Props> = props => {
  const { children } = props;

  // TODO: consider moving all these to useReducer (discuss first if needed)
  // #54 created to track this
  // https://github.com/Lemoncode/mongo-modeler/issues/54
  const [canvasSchema, setSchema] = useStateWithInterceptor(
    createDefaultDatabaseSchemaVm(),
    addSnapshot
  );

  React.useEffect(() => {
    initializeHistory;
  }, []);

  const loadSchema = (newSchema: DatabaseSchemaVm) => {
    setSchema(newSchema);
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
    setSchema(prevSchema =>
      produce(prevSchema, draft => {
        draft.tables.push(table);
      })
    );
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

  const updateTablePosition = (
    id: string,
    position: Coords,
    totalHeight: number,
    canvasSize: Size
  ) => {
    setSchema(prevSchema =>
      moveTableToTop(prevSchema, { id, position, totalHeight }, canvasSize)
    );
  };

  // TODO: #57 created to track this
  // https://github.com/Lemoncode/mongo-modeler/issues/57
  const doFieldToggleCollapse = (tableId: GUID, fieldId: GUID): void => {
    setSchema(currentSchema =>
      doFieldToggleCollapseLogic(currentSchema, tableId, fieldId)
    );
  };

  const doSelectElement = (id: GUID | null) => {
    setSchema(currentSchema => ({
      ...currentSchema,
      selectedElementId: id,
    }));
  };

  const doUndo = () => {
    if (canUndo()) {
      setSchema(undo() ?? canvasSchema);
    }
  };

  const doRedo = () => {
    if (canRedo()) {
      setSchema(redo() ?? canvasSchema);
    }
  };

  const canRedo = () => {
    return canRedoLogic();
  };

  const canUndo = () => {
    return canUndoLogic();
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
