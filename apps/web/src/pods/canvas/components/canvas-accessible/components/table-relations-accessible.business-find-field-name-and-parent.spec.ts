import { FieldVm } from '@/core/providers';
import { findFieldNameAndParent } from './table-relations-accessible.business';

describe('findFieldNameAndParent', () => {
  it('should find the field at the top level', () => {
    // Arrange
    const fields: FieldVm[] = [
      {
        id: '1',
        name: 'Field1',
        children: [
          {
            id: '2',
            name: 'Field2',
            PK: false,
            type: 'string',
          },
        ],
        PK: false,
        type: 'string',
      },
      {
        id: '3',
        name: 'Field3',
        PK: false,
        type: 'string',
      },
    ];

    // Act
    const result = findFieldNameAndParent(fields, '1');

    // Assert
    expect(result).toEqual({ fieldName: 'Field1' });
  });

  it('should find the field nested', () => {
    // Arrange
    const fields: FieldVm[] = [
      {
        id: '1',
        name: 'Field1',
        children: [
          {
            id: '2',
            name: 'Field2',
            PK: false,
            type: 'string',
          },
        ],
        PK: false,
        type: 'string',
      },
      {
        id: '3',
        name: 'Field3',
        PK: false,
        type: 'string',
      },
    ];

    // Act
    const result = findFieldNameAndParent(fields, '2');

    // Assert
    expect(result).toEqual({ fieldName: 'Field2', parentName: 'Field1' });
  });

  it('should return undefined when the field is not found', () => {
    // Arrange
    const fields: FieldVm[] = [
      {
        id: '1',
        name: 'Field1',
        children: [
          {
            id: '2',
            name: 'Field2',
            PK: false,
            type: 'string',
          },
        ],
        PK: false,
        type: 'string',
      },
      {
        id: '3',
        name: 'Field3',
        PK: false,
        type: 'string',
      },
    ];

    // Act
    const result = findFieldNameAndParent(fields, '4');

    // Assert
    expect(result).toBeUndefined();
  });
});
