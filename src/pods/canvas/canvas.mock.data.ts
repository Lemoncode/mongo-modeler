import { GenerateGUID } from '@/core/model';
import {
  DatabaseSchemaVm,
  RelationVm,
  TableVm,
} from '@/core/providers/canvas-schema';

const tagTableId = '1';
const restaurantTableId = '2';
const tagFieldId = GenerateGUID();
const restauranteNameFieldGUID = GenerateGUID();
const restaurantTagFieldGUID = GenerateGUID();

const restaurantIdField = GenerateGUID();

const mockRelations: RelationVm[] = [
  {
    fromTableId: tagTableId,
    toTableId: restaurantTableId,
    fromFieldId: tagFieldId,
    toFieldId: restaurantTagFieldGUID,
    type: '1:M',
  },
];

const mockTables: TableVm[] = [
  {
    id: tagTableId,
    x: 100,
    y: 150,
    tableName: 'tags',
    fields: [
      {
        id: tagFieldId,
        name: 'id',
        PK: true,
        type: 'number',
      },
      {
        id: restauranteNameFieldGUID,
        name: 'name',
        type: 'string',
        PK: false,
      },
    ],
  },
  {
    id: restaurantTableId,
    x: 500,
    y: 80,
    tableName: 'Restaurant',
    fields: [
      {
        id: restaurantIdField,
        name: 'id',
        type: 'number',
        PK: false,
      },
      {
        id: GenerateGUID(),
        name: 'name',
        type: 'string',
        PK: false,
      },
      {
        id: GenerateGUID(),
        name: 'menu',
        type: 'object',
        PK: false,
        children: [
          {
            id: GenerateGUID(),
            name: 'id',
            type: 'number',
            PK: false,
          },
          {
            id: GenerateGUID(),
            name: 'category',
            type: 'string',
            PK: false,
          },
          {
            id: GenerateGUID(),
            name: 'dishes',
            type: 'object',
            PK: false,
            children: [
              {
                id: GenerateGUID(),
                name: 'id',
                type: 'number',
                PK: false,
              },
              {
                id: GenerateGUID(),
                name: 'name',
                type: 'string',
                PK: false,
              },
              {
                id: GenerateGUID(),
                name: 'price',
                type: 'number',
                PK: false,
              },
            ],
          },
        ],
      },
      {
        id: restaurantTagFieldGUID,
        name: 'tags',
        type: 'number',
        PK: false,
      },
      {
        id: GenerateGUID(),
        name: 'address',
        type: 'object',
        PK: false,
        children: [
          {
            id: GenerateGUID(),
            name: 'street',
            type: 'string',
            PK: false,
          },
          {
            id: GenerateGUID(),
            name: 'city',
            type: 'string',
            PK: false,
          },
          {
            id: GenerateGUID(),
            name: 'state',
            type: 'string',
            PK: false,
          },
          {
            id: GenerateGUID(),
            name: 'zip',
            type: 'number',
            PK: false,
          },
        ],
      },
    ],
  },
];

export const mockSchema: DatabaseSchemaVm = {
  tables: mockTables,
  relations: mockRelations,
};
