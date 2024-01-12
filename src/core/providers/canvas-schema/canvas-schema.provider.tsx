import React from 'react';
import { produce } from 'immer';
import { CanvasSchemaContext } from './canvas-schema.context';
import {
  DatabaseSchemaVm,
  RelationVm,
  TableVm,
  createDefaultDatabaseSchemaVm,
} from './canvas-schema.model';
import { Coords, GUID, Size } from '@/core/model';
import { moveTableToTop, doFieldToggleCollapseLogic } from './canvas.business';
import { updateTable } from './canvas-schema.business';

interface Props {
  children: React.ReactNode;
}

export const CanvasSchemaProvider: React.FC<Props> = props => {
  const { children } = props;
  // TODO: consider moving all these to useReducer (discuss first if needed)
  // #54 created to track this
  // https://github.com/Lemoncode/mongo-modeler/issues/54
  const [canvasSchema, setSchema] = React.useState<DatabaseSchemaVm>(
    createDefaultDatabaseSchemaVm()
  );

  const loadSchema = (newSchema: DatabaseSchemaVm) => {
    setSchema(newSchema);
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
    setSchema(prevSchema =>
      produce(prevSchema, draft => {
        draft.relations.push(relation);
      })
    );
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

  return (
    <CanvasSchemaContext.Provider
      value={{
        canvasSchema,
        loadSchema,
        updateTablePosition,
        doFieldToggleCollapse,
        updateFullTable,
        addTable,
        addRelation,
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
