import { vi } from 'vitest';

import {
  saveToLocal,
  retrieveLocalSchema,
  CanvasSchema,
} from '@/core/autosave';
import { createDefaultDatabaseSchemaVm } from '@/core/providers';

// Mock localStorage implementation
const localStorageMock = (() => {
  let store: { [key: string]: string } = {};

  return {
    getItem: (key: string) => (key in store ? store[key] : null),
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Testing
describe('saveToLocal', () => {
  beforeEach(() => {
    localStorage.clear();
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should save canvas schema to local storage', () => {
    // Arrange
    const key = 'autoSaveFile';
    const value: CanvasSchema = {
      filename: 'schemaFilename',
      canvasSchema: {
        version: '0.1',
        tables: [{ id: '1', fields: [], tableName: 'tableName', x: 0, y: 0 }],
        relations: [],
        selectedElementId: null,
      },
    };
    const autosaveError = 0;
    const setAutosaveError = vi.fn();

    // Act
    saveToLocal(key, value, autosaveError, setAutosaveError);

    // Assert
    expect(localStorage.getItem(key)).toBeDefined();
    expect(JSON.parse(localStorage.getItem(key)!)).toEqual(value);
  });
});

describe('retrieveLocalSchema', () => {
  beforeEach(() => {
    localStorage.clear();
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return Default Database Schema (empty schema) if localStorage is empty', () => {
    // Arrange
    const setLoadSampleMock = vi.fn();
    const expected = createDefaultDatabaseSchemaVm();

    vi.spyOn(localStorage, 'getItem').mockReturnValueOnce(null);
    const setFilename = vi.fn();

    // Act
    const result = retrieveLocalSchema(
      'autoSaveFile',
      setLoadSampleMock,
      setFilename
    );

    // Assert
    expect(setLoadSampleMock).toHaveBeenCalledWith(true);
    expect(setFilename).toHaveBeenCalled();
    expect(result).toEqual(expected);
  });

  it('should return schema from localStorage if available', () => {
    // Arrange
    const setLoadSampleMock = vi.fn();

    const savedSchema = {
      version: '0.1',
      tables: [
        {
          id: '01',
          fields: [],
          tableName: 'tableName',
          x: 40,
          y: 48,
        },
      ],
      relations: [],
      selectedElementId: null,
    };

    vi.spyOn(localStorage, 'getItem').mockReturnValueOnce(
      JSON.stringify({
        filename: 'schemaFilename',
        canvasSchema: savedSchema,
      })
    );
    const setFilename = vi.fn();

    // Act
    const result = retrieveLocalSchema(
      'autoSaveFile',
      setLoadSampleMock,
      setFilename
    );

    // Assert
    expect(setLoadSampleMock).toHaveBeenCalledWith(false);
    expect(setFilename).toHaveBeenCalled();
    expect(result).toEqual(savedSchema);
  });

  it('should handle error and return default schema', () => {
    // Arrange
    const setLoadSampleMock = vi.fn();
    vi.spyOn(localStorage, 'removeItem').mockImplementationOnce(() => {});
    vi.spyOn(localStorage, 'setItem');

    vi.spyOn(localStorage, 'getItem').mockImplementationOnce(() => {
      throw new Error('Mock error');
    });

    const expectedSchema = createDefaultDatabaseSchemaVm();
    const setFilename = vi.fn();

    // Act
    const result = retrieveLocalSchema(
      'autoSaveFile',
      setLoadSampleMock,
      setFilename
    );

    // Assert
    expect(localStorage.removeItem).toHaveBeenCalled();
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'autoSaveFile',
      JSON.stringify({
        filename: '',
        canvasSchema: createDefaultDatabaseSchemaVm(),
      })
    );
    expect(setLoadSampleMock).toHaveBeenCalledWith(true);
    expect(result).toEqual(expectedSchema);
  });
});
