import { GUID } from '@/core/model';
import {
  generateRouteField,
  findFields,
  getTableNameById,
} from '@/pods/canvas/components/canvas-accessible/components/relation-accesible.bussines';
import {
  FieldVm,
  TableVm,
} from '@/core/providers/canvas-schema/canvas-schema-vlatest.model';

describe('generateRouteField', () => {
  it('Should return undefined if the field does not matches the id of an array of fields', () => {
    // Arrange
    const fields: FieldVm[] = [
      {
        id: '1',
        PK: false,
        name: 'foo',
        type: 'string',
      },

      {
        id: '2',
        PK: false,
        name: 'lalal',
        type: 'string',
      },
    ];

    const fieldId: GUID = '3';
    // Act
    const result = generateRouteField(fields, fieldId, []);
    // Assert
    expect(result).toBe(undefined);
  });

  it('Should return the name of parents fields and the name of the field that matches the id of an array of fields with children', () => {
    // Arrange
    const fields: FieldVm[] = [
      {
        id: '1',
        PK: true,
        name: 'title',
        type: 'string',
      },
      {
        id: '2',
        PK: false,
        name: 'author',
        type: 'string',
        children: [{ id: '3', PK: false, name: 'name', type: 'string' }],
      },
    ];

    const fieldId: GUID = '3';
    // Act

    const result = generateRouteField(fields, fieldId, []);

    // Assert
    const expected = 'author - name';

    expect(result).toEqual(expected);
  });

  it('Should return the names of parents fields and the name of the field that matches the id of an array of fields with children with fields', () => {
    // Arrange
    const fields: FieldVm[] = [
      {
        id: '1',
        PK: true,
        name: 'title',
        type: 'string',
      },
      {
        id: '2',
        PK: false,
        name: 'author',
        type: 'string',
        children: [
          {
            id: '3',
            PK: false,
            name: 'name',
            type: 'string',
            children: [
              { id: '4', PK: false, name: 'placeOfBirth', type: 'string' },
            ],
          },
        ],
      },
    ];

    const fieldId: GUID = '4';
    // Act
    const result = generateRouteField(fields, fieldId, []);
    // Assert
    const expected = 'author - name - placeOfBirth';

    expect(result).toEqual(expected);
  });
});

describe('findFields', () => {
  it('Should return empty array if fields is undefined', () => {
    // Arrange
    const tables: any[] = [
      {
        id: '1',
        fields: undefined,
        tableName: 'Books',
        x: 1468,
        y: 51,
      },
    ];

    const id: GUID = '1';
    // Act
    const result = findFields(tables, id);
    // Assert
    expect(result).toEqual([]);
  });

  it('Should return empty array if does not matches table id with id argument', () => {
    // Arrange
    const tables: TableVm[] = [
      {
        id: '1',
        fields: [{ id: '2', PK: false, name: 'title', type: 'string' }],
        tableName: 'Books',
        x: 1587,
        y: 924,
      },
    ];

    const id: GUID = '3';
    // Act
    const result = findFields(tables, id);
    // Assert

    expect(result).toEqual([]);
  });

  it('Should return the fields of the table if table id matches with id argument', () => {
    // Arrange
    const tables: TableVm[] = [
      {
        id: '1',
        fields: [
          {
            id: '1',
            PK: true,
            name: 'title',
            type: 'string',
          },
          {
            id: '2',
            PK: false,
            name: 'pages',
            type: 'int',
          },
        ],
        tableName: 'Books',
        x: 2000,
        y: 71,
      },
      {
        id: '2',
        fields: [
          {
            id: '1',
            PK: false,
            name: 'John Doe',
            type: 'string',
          },
          {
            id: '2',
            PK: false,
            name: 'Jane Doe',
            type: 'string',
          },
        ],
        tableName: 'Authors',
        x: 1400,
        y: 58,
      },
    ];

    const id: GUID = '2';
    // Act
    const result = findFields(tables, id);
    // Assert
    const expected: FieldVm[] = [
      {
        id: '1',
        PK: false,
        name: 'John Doe',
        type: 'string',
      },
      {
        id: '2',
        PK: false,
        name: 'Jane Doe',
        type: 'string',
      },
    ];

    expect(result).toEqual(expected);
  });
});

describe('getTableNameById', () => {
  it('Should return the message Not found if the table id not matches with id argument', () => {
    // Arrange
    const tables: TableVm[] = [
      {
        id: '3',
        fields: [
          {
            id: '1',
            PK: false,
            name: 'DateOfDeparture',
            type: 'date',
          },
        ],
        tableName: 'Flights',
        x: 500,
        y: 200,
      },
    ];

    const id: GUID = '1';
    // Act
    const result = getTableNameById(tables, id);
    // Assert
    expect(result).toBe('Not found');
  });

  it('Should return the name of table if table id do match with id argument', () => {
    // Arrange
    const tables: TableVm[] = [
      {
        id: '2',
        fields: [
          {
            id: '1',
            PK: false,
            name: 'fullName',
            type: 'string',
          },
        ],
        tableName: 'User',
        x: 100,
        y: 300,
      },
    ];

    const id: GUID = '2';
    // Act
    const result = getTableNameById(tables, id);
    // Act
    expect(result).toBe('User');
  });
});
