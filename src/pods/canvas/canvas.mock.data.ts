import { GenerateGUID } from '@/core/model';
import {
  DatabaseSchemaVm,
  RelationVm,
  TableVm,
} from '@/core/providers/canvas-schema';
import { TABLE_CONST } from '@/core/providers/canvas-schema/canvas.const';

const tagRelationId = '1';
const tagTableId = '1';
const restaurantTableId = '2';
const tagFieldId = GenerateGUID();
const restauranteNameFieldGUID = GenerateGUID();
const restaurantTagFieldGUID = GenerateGUID();

const restaurantIdField = GenerateGUID();

const mockRelations: RelationVm[] = [
  {
    id: tagRelationId,
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
    x: TABLE_CONST.DEFAULT_TABLE_WIDTH / 2,
    y: 150,
    tableName: 'tags',
    fields: [
      {
        id: tagFieldId,
        name: 'id',
        PK: true,
        type: 'int',
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
    x: TABLE_CONST.DEFAULT_TABLE_WIDTH + 200,
    y: 80,
    tableName: 'Restaurant',
    fields: [
      {
        id: restaurantIdField,
        name: 'id',
        type: 'int',
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
            type: 'objectId',
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
            isArray: true,
            PK: false,
            children: [
              {
                id: GenerateGUID(),
                name: 'id',
                type: 'objectId',
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
                type: 'decimal',
                PK: false,
              },
            ],
          },
        ],
      },
      {
        id: restaurantTagFieldGUID,
        name: 'tags',
        type: 'objectId',
        isArray: true,
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
            type: 'int',
            PK: false,
          },
        ],
      },
    ],
  },
];

export const mockSchema: DatabaseSchemaVm = {
  selectedElementId: null,
  tables: mockTables,
  relations: mockRelations,
};
