import { act, renderHook } from '@testing-library/react';
import { vi } from 'vitest';
import { useStateWithInterceptor } from './canvas-schema.hook';
import { DatabaseSchemaVm } from '.';

describe('useStateWithInterceptor', () => {
  it('should call schemaInterceptorFn with the new state and return the new state when setSchema is called', async () => {
    // Arrange
    const initialState: DatabaseSchemaVm = {
      version: '0.1',
      tables: [],
      relations: [],
      selectedElementId: null,
    };

    const newSchema: DatabaseSchemaVm = {
      version: '0.1',
      selectedElementId: null,
      relations: [],
      tables: [
        {
          id: '1',
          fields: [
            {
              id: '11',
              name: 'field1',
              PK: true,
              type: 'string',
            },
            {
              id: '12',
              name: 'field2',
              PK: false,
              type: 'string',
            },
          ],
          tableName: 'test table name',
          x: 5,
          y: 15,
        },
      ],
    };

    const schemaInterceptorFn = vi.fn();

    // Act
    const { result } = renderHook(() =>
      useStateWithInterceptor(initialState, schemaInterceptorFn)
    );

    const [, setSchema] = result.current;

    // Test setSchema function
    act(() => {
      setSchema(newSchema);
    });

    const [canvasSchema] = result.current;

    // Assert
    expect(schemaInterceptorFn).toHaveBeenCalledWith(newSchema);
    expect(canvasSchema).toEqual(newSchema);
  });

  it('should call return the new state when setSchemaSkipInterceptor is called', async () => {
    // Arrange
    const initialState: DatabaseSchemaVm = {
      version: '0.1',
      tables: [],
      relations: [],
      selectedElementId: null,
    };

    const newSchema: DatabaseSchemaVm = {
      version: '0.1',
      selectedElementId: null,
      relations: [],
      tables: [
        {
          id: '1',
          fields: [
            {
              id: '1',
              name: 'test not update name',
              PK: true,
              type: 'objectId',
            },
            {
              id: '2',
              name: 'test update id name 2',
              PK: false,
              type: 'string',
            },
          ],
          tableName: 'test table name',
          x: 5,
          y: 15,
        },
      ],
    };

    const schemaInterceptorFn = vi.fn();

    // Act
    const { result } = renderHook(() =>
      useStateWithInterceptor(initialState, schemaInterceptorFn)
    );

    const [, , setSchemaSkipInterceptor] = result.current;

    // Test setSchemaSkipInterceptor function
    act(() => {
      setSchemaSkipInterceptor(newSchema);
    });

    const [canvasSchema] = result.current;

    // Assert
    expect(canvasSchema).toEqual(newSchema);
  });
});
