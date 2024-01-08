import { TableVm } from './canvas-schema.model';
import { DatabaseSchemaVm } from './canvas-schema.model';
import { updateTable } from './canvas-schema.business';

describe('canvas-schema.business', () => {
  describe('updateTable', () => {
    it('', () => {
      // Arrange
      const table: TableVm = {
        id: '1',
        fields: [
          {
            id: '1',
            name: 'test name',
            PK: true,
            type: 'objectId',
          },
        ],
        tableName: 'test table name',
        x: 20,
        y: 6,
      };

      const dbSchema: DatabaseSchemaVm = {
        relations: [
          {
            fromFieldId: '10',
            fromTableId: '9',
            toFieldId: '1',
            toTableId: '1',
            type: '1:1',
          },
        ],
        tables: [
          {
            id: '1',
            fields: [
              {
                id: '1',
                name: 'test name',
                PK: true,
                type: 'objectId',
              },
            ],
            tableName: 'test table name',
            x: 20,
            y: 6,
          },
        ],
      };

      const expectedResult: DatabaseSchemaVm = {
        relations: [
          {
            fromFieldId: '10',
            fromTableId: '9',
            toFieldId: '1',
            toTableId: '1',
            type: '1:1',
          },
        ],
        tables: [
          {
            id: '1',
            fields: [
              {
                id: '1',
                name: 'test name',
                PK: true,
                type: 'objectId',
              },
            ],
            tableName: 'test table name',
            x: 20,
            y: 6,
          },
        ],
      };
      // Act
      const result = updateTable(table, dbSchema);

      // Assert
      expect(result).toEqual(expectedResult);
    });
  });
});
