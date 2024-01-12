import {
  mapEditTableVmToTableVm,
  mapTableVmToEditTableVm,
} from './edit-table.mapper';
import * as canvasModel from '@/core/providers/canvas-schema/canvas-schema.model';
import * as editTableModel from './edit-table.vm';

describe('mapEditTableVmToTableVm', () => {
  it('should return a copy of "canvasTable" without "fields"', () => {
    // Arrange
    const table: editTableModel.TableVm = {
      id: '1',
      fields: [],
      tableName: 'ProductA',
      x: 2,
      y: 3,
    };
    const expectedResult: canvasModel.TableVm = {
      id: '1',
      fields: [],
      tableName: 'ProductA',
      x: 2,
      y: 3,
    };
    // Act
    const result = mapEditTableVmToTableVm(table);
    // Assert
    expect(result).toEqual(expectedResult);
  });

  describe('mapEditTableFieldsToTableVmFields', () => {
    it('should return a canvasVm correctly', () => {
      // Arrange
      const table: editTableModel.TableVm = {
        id: '01',
        fields: [
          {
            id: '1',
            PK: true,
            FK: false,
            name: '_id',
            type: 'objectId',
            children: [
              {
                id: '3',
                FK: false,
                PK: false,
                name: '_type',
                type: 'string',
                children: [],
              },
            ],
          },
          {
            id: '2',
            PK: false,
            FK: true,
            name: '_name',
            type: 'string',
          },
        ],
        tableName: 'ProductA',
        x: 2,
        y: 3,
      };
      const expectedResult: canvasModel.TableVm = {
        id: '01',
        fields: [
          {
            id: '1',
            PK: true,
            name: '_id',
            type: 'objectId',
            children: [
              {
                id: '3',
                PK: false,
                name: '_type',
                type: 'string',
                children: [],
              },
            ],
          },
          {
            id: '2',
            PK: false,
            name: '_name',
            type: 'string',
            children: [],
          },
        ],
        tableName: 'ProductA',
        x: 2,
        y: 3,
      };
      // Act
      const result = mapEditTableVmToTableVm(table);
      // Assert
      expect(result).toEqual(expectedResult);
    });
  });
});

describe('mapTableVmToEditTableVm', () => {
  it('should return a editTableVm with FK in fields with true or false depending on it is a foreign key', () => {
    // Arrange
    const table: canvasModel.TableVm = {
      id: '01',
      fields: [
        {
          id: '1',
          PK: true,
          name: '_id',
          type: 'objectId',
          children: [
            {
              id: '3',
              PK: false,
              name: '_type',
              type: 'string',
              children: [],
            },
          ],
        },
        {
          id: '2',
          PK: false,
          name: '_name',
          type: 'string',
          children: [],
        },
      ],
      tableName: 'ProductA',
      x: 2,
      y: 3,
    };
    const relation: canvasModel.RelationVm[] = [
      {
        fromTableId: '01',
        toTableId: '02',
        fromFieldId: '1',
        toFieldId: '2',
        type: '1:1',
      },
      {
        fromTableId: '01',
        toTableId: '02',
        fromFieldId: '3',
        toFieldId: '2',
        type: '1:1',
      },
    ];

    const expectedResult: editTableModel.TableVm = {
      id: '01',
      fields: [
        {
          id: '1',
          PK: true,
          FK: true,
          name: '_id',
          type: 'objectId',
          children: [
            {
              id: '3',
              FK: true,
              PK: false,
              name: '_type',
              type: 'string',
              children: [],
            },
          ],
        },
        {
          id: '2',
          PK: false,
          FK: false,
          name: '_name',
          type: 'string',
          children: [],
        },
      ],
      tableName: 'ProductA',
      x: 2,
      y: 3,
    };
    // Act
    const result = mapTableVmToEditTableVm(table, relation);
    // Assert
    expect(result).toEqual(expectedResult);
  });
});
