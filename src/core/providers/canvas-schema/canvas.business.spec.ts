import { doesRelationAlreadyExists } from './canvas.business';
import { RelationVm, DatabaseSchemaVm } from './canvas-schema.model';

describe('doesRelationAlreadyExists', () => {
  it('should return true if relation already exists', () => {
    const alreadyExists: DatabaseSchemaVm = {
      selectedElementId: null,
      tables: [
        {
          id: '1',
          fields: [
            {
              id: '1',
              name: 'field1table1',
              type: 'string',
              PK: false,
            },
            {
              id: '2',
              name: 'field2table1',
              type: 'string',
              PK: false,
            },
          ],
          tableName: 'table1',
          x: -200,
          y: 0,
        },
        {
          id: '2',
          fields: [
            {
              id: '1',
              name: 'field1tanble2',
              type: 'string',
              PK: false,
            },
            {
              id: '2',
              name: 'field2table2',
              type: 'string',
              PK: false,
            },
          ],
          tableName: 'table2',
          x: 200,
          y: 0,
        },
      ],
      relations: [
        {
          id: '1',
          fromTableId: '1',
          toTableId: '2',
          fromFieldId: 'field1table1',
          toFieldId: 'field2table2',
          type: '1:1',
        },
      ],
    };

    const newRelation: RelationVm = {
      id: '1',
      fromTableId: '1',
      toTableId: '2',
      fromFieldId: 'field1table1',
      toFieldId: 'field2table2',
      type: '1:1',
    };

    const result = doesRelationAlreadyExists(alreadyExists, newRelation);

    expect(result).toBe(true);
  });

  it('should return false if relation does not exist', () => {
    const alreadyExists: DatabaseSchemaVm = {
      selectedElementId: null,
      tables: [
        {
          id: '1',
          fields: [
            {
              id: '1',
              name: 'field1table1',
              type: 'string',
              PK: false,
            },
            {
              id: '2',
              name: 'field2table1',
              type: 'string',
              PK: false,
            },
          ],
          tableName: 'table1',
          x: -200,
          y: 0,
        },
        {
          id: '2',
          fields: [
            {
              id: '1',
              name: 'field1tanble2',
              type: 'string',
              PK: false,
            },
            {
              id: '2',
              name: 'field2table2',
              type: 'string',
              PK: false,
            },
          ],
          tableName: 'table2',
          x: 200,
          y: 0,
        },
      ],
      relations: [
        {
          id: '1',
          fromTableId: '1',
          toTableId: '2',
          fromFieldId: 'field1table1',
          toFieldId: 'field2table1',
          type: '1:1',
        },
      ],
    };

    const newRelation: RelationVm = {
      id: '1',
      fromTableId: '1',
      toTableId: '2',
      fromFieldId: 'field1table1',
      toFieldId: 'field2table2',
      type: '1:1',
    };

    const result = doesRelationAlreadyExists(alreadyExists, newRelation);

    expect(result).toBe(false);
  });
});
