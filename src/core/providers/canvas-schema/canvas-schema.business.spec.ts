import { TableVm } from './canvas-schema.model';
import { DatabaseSchemaVm } from './canvas-schema.model';
import { updateTable } from './canvas-schema.business';

describe('canvas-schema.business', () => {
  describe('updateTable', () => {
    it('Should updated one table field when the id table its the same', () => {
      // Arrange
      const table: TableVm = {
        id: '1',
        fields: [
          {
            id: '1',
            name: 'test update id name',
            PK: true,
            type: 'objectId',
          },
        ],
        tableName: 'test update table name',
        x: 10,
        y: 2,
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
                name: 'test update id name',
                PK: true,
                type: 'objectId',
              },
            ],
            tableName: 'test update table name',
            x: 10,
            y: 2,
          },
        ],
      };
      // Act
      const result = updateTable(table, dbSchema);

      // Assert
      expect(result).toEqual(expectedResult);
    });

    it('Should updated two table fields when the id table its the same', () => {
      // Arrange
      const table: TableVm = {
        id: '1',
        fields: [
          {
            id: '1',
            name: 'test update id name 1',
            PK: true,
            type: 'objectId',
          },
          {
            id: '2',
            name: 'test update id name 2',
            PK: false,
            type: 'number',
          },
        ],
        tableName: 'test update table name',
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
            type: '1:M',
          },
        ],
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
            ],
            tableName: 'test table name',
            x: 5,
            y: 15,
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
            type: '1:M',
          },
        ],
        tables: [
          {
            id: '1',
            fields: [
              {
                id: '1',
                name: 'test update id name 1',
                PK: true,
                type: 'objectId',
              },
              {
                id: '2',
                name: 'test update id name 2',
                PK: false,
                type: 'number',
              },
            ],
            tableName: 'test update table name',
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

    it('Should remove all the tables when the id table its the same', () => {
      // Arrange
      const table: TableVm = {
        id: '1',
        fields: [],
        tableName: 'test update table name',
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
            type: '1:M',
          },
        ],
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
            ],
            tableName: 'test table name',
            x: 5,
            y: 15,
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
            type: '1:M',
          },
        ],
        tables: [
          {
            id: '1',
            fields: [],
            tableName: 'test update table name',
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

    it('Should remove only one table when the id table its the same', () => {
      // Arrange
      const table: TableVm = {
        id: '1',
        fields: [
          {
            id: '1',
            name: 'test update id name 1',
            PK: true,
            type: 'objectId',
          },
          {
            id: '2',
            name: 'test update id name 2',
            PK: false,
            type: 'number',
          },
        ],
        tableName: 'test update table name',
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
            type: '1:M',
          },
        ],
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
              {
                id: '3',
                name: 'test update id name 3',
                PK: false,
                type: 'object',
              },
            ],
            tableName: 'test table name',
            x: 5,
            y: 15,
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
            type: '1:M',
          },
        ],
        tables: [
          {
            id: '1',
            fields: [
              {
                id: '1',
                name: 'test update id name 1',
                PK: true,
                type: 'objectId',
              },
              {
                id: '2',
                name: 'test update id name 2',
                PK: false,
                type: 'number',
              },
            ],
            tableName: 'test update table name',
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

    it('Not should update table fields when the id table it is not the same', () => {
      // Arrange
      const table: TableVm = {
        id: '2',
        fields: [
          {
            id: '1',
            name: 'test update id name',
            PK: true,
            type: 'objectId',
          },
        ],
        tableName: 'test update table name',
        x: 7,
        y: 20,
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
            x: 15,
            y: 25,
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
            x: 15,
            y: 25,
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
