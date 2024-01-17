import { findField } from './canvas.business';
import { FieldVm } from './canvas-schema.model';

describe('findField', () => {
  it('returns undefined if the field does not match the id of an array of fields', () => {
    //Arrange
    const fields: FieldVm[] = [
      {
        id: '1',
        name: 'Hi',
        type: 'int',
        PK: false,
      },
      {
        id: '2',
        name: 'Bye',
        type: 'string',
        PK: false,
      },
    ];

    // Act
    const result = findField(fields, '3');

    // Assert
    expect(result).toBe(undefined);
  });

  it('returns the field that matches the id of an array of fields', () => {
    //Arrange
    const fields: FieldVm[] = [
      {
        id: '1',
        name: 'Hi',
        type: 'int',
        PK: false,
      },
      {
        id: '2',
        name: 'Bye',
        type: 'string',
        PK: false,
      },
    ];

    // Act
    const result = findField(fields, '1');

    // Assert
    const expected: FieldVm = {
      id: '1',
      name: 'Hi',
      type: 'int',
      PK: false,
    };

    expect(result).toEqual(expected);
  });

  it('returns the field that matches the id of an array of fields with children with fields', () => {
    //Arrange
    const fields: FieldVm[] = [
      {
        id: '1',
        name: 'Hi',
        type: 'int',
        PK: false,
      },
      {
        id: '2',
        name: 'Bye',
        type: 'string',
        PK: false,
        children: [{ id: '3', name: 'Pie', type: 'string', PK: false }],
      },
    ];

    // Act
    const result = findField(fields, '3');

    // Assert
    const expected: FieldVm = {
      id: '3',
      name: 'Pie',
      type: 'string',
      PK: false,
    };

    expect(result).toEqual(expected);
  });

  it('returns the field that matches the id of an array of fields with children with fields', () => {
    //Arrange
    const fields: FieldVm[] = [
      {
        id: '1',
        name: 'Hi',
        type: 'int',
        PK: false,
      },
      {
        id: '2',
        name: 'Bye',
        type: 'string',
        PK: false,
        children: [
          { id: '3', name: 'Pie', type: 'string', PK: false },
          {
            id: '4',
            name: 'Age',
            type: 'string',
            PK: false,
            children: [{ id: '5', name: 'Cup', type: 'string', PK: false }],
          },
        ],
      },
    ];

    // Act
    const result = findField(fields, '5');

    // Assert
    const expected: FieldVm = {
      id: '5',
      name: 'Cup',
      type: 'string',
      PK: false,
    };

    expect(result).toEqual(expected);
  });
});
