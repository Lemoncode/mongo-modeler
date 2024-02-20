import React, { Dispatch, SetStateAction } from 'react';

/*
  This is a wrapper for useState

  In this case we want to execute some function whenever the state change

  For instance Undo / Redo functionallity.

  Whenever you do a setState you want to store it in the queue of changes
  so you can undo it later, instead of having to remember to call storeInUndoQueue
  you can just call _setState_ and it will do it for you.
*/
export function useStateWithInterceptor<S>(
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
