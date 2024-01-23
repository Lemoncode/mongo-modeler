import { TableVm, DatabaseSchemaVm } from '../canvas-schema.model';
import { addNewTable, updateTable } from '../canvas-schema.business';

describe('canvas-schema.business', () => {
  describe('updateTable', () => {
    it('Should updated one table field when the id table schema its the same', () => {
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
        selectedElementId: null,
        relations: [
          {
            id: '20',
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
        selectedElementId: null,
        relations: [
          {
            id: '20',
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
            type: 'int',
          },
        ],
        tableName: 'test update table name',
        x: 20,
        y: 6,
      };

      const dbSchema: DatabaseSchemaVm = {
        selectedElementId: null,

        relations: [
          {
            id: '20',
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
        selectedElementId: null,
        relations: [
          {
            id: '20',
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
                type: 'int',
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

    it('Should remove all the table fields when the id table schema its the same', () => {
      // Arrange
      const table: TableVm = {
        id: '1',
        fields: [],
        tableName: 'test update table name',
        x: 20,
        y: 6,
      };

      const dbSchema: DatabaseSchemaVm = {
        selectedElementId: null,
        relations: [
          {
            id: '20',
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
        selectedElementId: null,
        relations: [],
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

    it('Should remove only one table fields when the id table schema its the same', () => {
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
            type: 'int',
          },
        ],
        tableName: 'test update table name',
        x: 20,
        y: 6,
      };

      const dbSchema: DatabaseSchemaVm = {
        selectedElementId: null,
        relations: [
          {
            id: '20',
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
        selectedElementId: null,
        relations: [
          {
            id: '20',
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
                type: 'int',
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

    it('Should update one tables when the id table schemas is the same but the another one no', () => {
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
            type: 'int',
          },
        ],
        tableName: 'test update table name',
        x: 20,
        y: 6,
      };

      const dbSchema: DatabaseSchemaVm = {
        selectedElementId: null,
        relations: [
          {
            id: '20',
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
          {
            id: '2',
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
            tableName: 'test table 2 name',
            x: 5,
            y: 15,
          },
        ],
      };

      const expectedResult: DatabaseSchemaVm = {
        selectedElementId: null,
        relations: [
          {
            id: '20',
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
                type: 'int',
              },
            ],
            tableName: 'test update table name',
            x: 20,
            y: 6,
          },
          {
            id: '2',
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
            tableName: 'test table 2 name',
            x: 5,
            y: 15,
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
        selectedElementId: null,
        relations: [
          {
            id: '20',
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
        selectedElementId: null,
        relations: [
          {
            id: '20',
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

  describe('addNewTable', () => {
    it('Should add a new table with empty fields array in the "databaseSchemaVm"', () => {
      // Arrange
      const table: TableVm = {
        id: '2',
        fields: [],
        tableName: 'ProductA',
        x: 15,
        y: 15,
      };
      const databaseSchema: DatabaseSchemaVm = {
        tables: [
          {
            id: '1',
            x: 160,
            y: 150,
            tableName: 'tags',
            fields: [
              {
                id: '1',
                PK: true,
                name: '_id',
                type: 'objectId',
                children: [],
              },
              {
                id: '2',
                name: '_name',
                type: 'string',
                PK: false,
              },
            ],
          },
          {
            id: '41',
            x: 520,
            y: 80,
            tableName: 'Restaurant',
            fields: [
              {
                id: '1',
                PK: true,
                name: '_id',
                type: 'objectId',
                children: [],
              },
              {
                id: '31',
                PK: true,
                name: '_tagsId',
                type: 'objectId',
                children: [
                  {
                    id: '2',
                    PK: false,
                    name: '_name',
                    type: 'string',
                  },
                ],
              },
            ],
          },
        ],
        relations: [
          {
            id: '21',
            fromFieldId: '1',
            fromTableId: '1',
            toFieldId: '31',
            toTableId: '42',
            type: '1:M',
          },
        ],
        selectedElementId: null,
      };
      const expectedResult: DatabaseSchemaVm = {
        tables: [
          {
            id: '1',
            x: 160,
            y: 150,
            tableName: 'tags',
            fields: [
              {
                id: '1',
                PK: true,
                name: '_id',
                type: 'objectId',
                children: [],
              },
              {
                id: '2',
                name: '_name',
                type: 'string',
                PK: false,
              },
            ],
          },
          {
            id: '41',
            x: 520,
            y: 80,
            tableName: 'Restaurant',
            fields: [
              {
                id: '1',
                PK: true,
                name: '_id',
                type: 'objectId',
                children: [],
              },
              {
                id: '31',
                PK: true,
                name: '_tagsId',
                type: 'objectId',
                children: [
                  {
                    id: '2',
                    PK: false,
                    name: '_name',
                    type: 'string',
                  },
                ],
              },
            ],
          },
          {
            id: '2',
            fields: [],
            tableName: 'ProductA',
            x: 15,
            y: 15,
          },
        ],
        relations: [
          {
            id: '21',
            fromFieldId: '1',
            fromTableId: '1',
            toFieldId: '31',
            toTableId: '42',
            type: '1:M',
          },
        ],
        selectedElementId: null,
      };

      // Act
      const result = addNewTable(table, databaseSchema);

      // Assert
      expect(result).toEqual(expectedResult);
    });
    it('Should add a new table with fields and childrens in the "databaseSchemaVm"', () => {
      // Arrange
      const table: TableVm = {
        id: '2',
        fields: [
          {
            id: '1',
            PK: true,
            name: '_id',
            type: 'objectId',
            children: [],
          },
          {
            id: '3',
            PK: false,
            name: '_name',
            type: 'string',
            children: [
              {
                id: '2',
                PK: false,
                name: '_otherName',
                type: 'string',
              },
            ],
          },
        ],
        tableName: 'ProductA',
        x: 15,
        y: 15,
      };
      const databaseSchema: DatabaseSchemaVm = {
        tables: [
          {
            id: '1',
            x: 160,
            y: 150,
            tableName: 'tags',
            fields: [
              {
                id: '1',
                PK: true,
                name: '_id',
                type: 'objectId',
                children: [],
              },
              {
                id: '2',
                name: '_name',
                type: 'string',
                PK: false,
              },
            ],
          },
          {
            id: '41',
            x: 520,
            y: 80,
            tableName: 'Restaurant',
            fields: [
              {
                id: '1',
                PK: true,
                name: '_id',
                type: 'objectId',
                children: [],
              },
              {
                id: '31',
                PK: true,
                name: '_tagsId',
                type: 'objectId',
                children: [
                  {
                    id: '2',
                    PK: false,
                    name: '_name',
                    type: 'string',
                  },
                ],
              },
            ],
          },
        ],
        relations: [
          {
            id: '21',
            fromFieldId: '1',
            fromTableId: '1',
            toFieldId: '31',
            toTableId: '42',
            type: '1:M',
          },
        ],
        selectedElementId: null,
      };
      const expectedResult: DatabaseSchemaVm = {
        tables: [
          {
            id: '1',
            x: 160,
            y: 150,
            tableName: 'tags',
            fields: [
              {
                id: '1',
                PK: true,
                name: '_id',
                type: 'objectId',
                children: [],
              },
              {
                id: '2',
                name: '_name',
                type: 'string',
                PK: false,
              },
            ],
          },
          {
            id: '41',
            x: 520,
            y: 80,
            tableName: 'Restaurant',
            fields: [
              {
                id: '1',
                PK: true,
                name: '_id',
                type: 'objectId',
                children: [],
              },
              {
                id: '31',
                PK: true,
                name: '_tagsId',
                type: 'objectId',
                children: [
                  {
                    id: '2',
                    PK: false,
                    name: '_name',
                    type: 'string',
                  },
                ],
              },
            ],
          },
          {
            id: '2',
            fields: [
              {
                id: '1',
                PK: true,
                name: '_id',
                type: 'objectId',
                children: [],
              },
              {
                id: '3',
                PK: false,
                name: '_name',
                type: 'string',
                children: [
                  {
                    id: '2',
                    PK: false,
                    name: '_otherName',
                    type: 'string',
                  },
                ],
              },
            ],
            tableName: 'ProductA',
            x: 15,
            y: 15,
          },
        ],
        relations: [
          {
            id: '21',
            fromFieldId: '1',
            fromTableId: '1',
            toFieldId: '31',
            toTableId: '42',
            type: '1:M',
          },
        ],
        selectedElementId: null,
      };

      // Act
      const result = addNewTable(table, databaseSchema);

      // Assert
      expect(result).toEqual(expectedResult);
    });
    it('Should add a new table when the table in "databaseSchemaVm" is an empty array', () => {
      // Arrange
      const table: TableVm = {
        id: '2',
        fields: [
          {
            id: '1',
            PK: true,
            name: '_id',
            type: 'objectId',
            children: [],
          },
          {
            id: '3',
            PK: false,
            name: '_name',
            type: 'string',
            children: [
              {
                id: '2',
                PK: false,
                name: '_otherName',
                type: 'string',
              },
            ],
          },
        ],
        tableName: 'ProductA',
        x: 15,
        y: 15,
      };
      const databaseSchema: DatabaseSchemaVm = {
        tables: [],
        relations: [
          {
            id: '21',
            fromFieldId: '1',
            fromTableId: '1',
            toFieldId: '31',
            toTableId: '42',
            type: '1:M',
          },
        ],
        selectedElementId: null,
      };
      const expectedResult: DatabaseSchemaVm = {
        tables: [
          {
            id: '2',
            fields: [
              {
                id: '1',
                PK: true,
                name: '_id',
                type: 'objectId',
                children: [],
              },
              {
                id: '3',
                PK: false,
                name: '_name',
                type: 'string',
                children: [
                  {
                    id: '2',
                    PK: false,
                    name: '_otherName',
                    type: 'string',
                  },
                ],
              },
            ],
            tableName: 'ProductA',
            x: 15,
            y: 15,
          },
        ],
        relations: [
          {
            id: '21',
            fromFieldId: '1',
            fromTableId: '1',
            toFieldId: '31',
            toTableId: '42',
            type: '1:M',
          },
        ],
        selectedElementId: null,
      };

      // Act
      const result = addNewTable(table, databaseSchema);

      // Assert
      expect(result).toEqual(expectedResult);
    });
  });
});
