import {
  DatabaseSchemaVm,
  Versions,
} from '@/core/providers/canvas-schema/canvas-schema-vlatest.model';
import { mapSchemaToLatestVersion } from './canvas-schema.mapper';

describe('mapSchemaToLatestVersion', () => {
  it('should return the input schema mapped with the latest version if version is not informed', () => {
    // Arrange
    const schema: any = {
      version: null,
      tables: [],
      relations: [],
      selectedElementId: null,
    };
    const expectedResult: DatabaseSchemaVm = {
      version: '0.1',
      tables: [],
      relations: [],
      selectedElementId: null,
    };
    // Act
    const result = mapSchemaToLatestVersion(schema);
    // Assert
    expect(result).toEqual(expectedResult);
  });

  it('should return a copy of "schema" if version is latest', () => {
    // Arrange
    const schema: any = {
      version: '0.1',
      tables: [],
      relations: [],
      selectedElementId: null,
    };
    const expectedResult: DatabaseSchemaVm = {
      version: '0.1',
      tables: [],
      relations: [],
      selectedElementId: null,
    };
    // Act
    const result = mapSchemaToLatestVersion(schema);
    // Assert
    expect(result).toEqual(expectedResult);
  });

  it('should return a copy of "schema" if version is not recognized', () => {
    // Arrange
    const schema: any = {
      version: '1.0',
      tables: [],
      relations: [],
      selectedElementId: null,
    };
    const expectedResult: DatabaseSchemaVm = {
      version: '1.0' as Versions,
      tables: [],
      relations: [],
      selectedElementId: null,
    };
    // Act
    const result = mapSchemaToLatestVersion(schema);
    // Assert
    expect(result).toEqual(expectedResult);
  });
});
