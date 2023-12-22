import {
  DatabaseSchemaVm,
  GenerateGUID,
  RelationVm,
  TableVm,
} from "./canvas.vm";

const tagTableId = "1";
const restaurantTableId = "2";
const tagFieldId = GenerateGUID();
const restaurantTagFieldGUID = GenerateGUID();

const mockRelations: RelationVm[] = [
  {
    fromTableId: tagTableId,
    toTableId: restaurantTableId,
    fromFieldId: tagFieldId,
    toFieldId: restaurantTagFieldGUID,
    type: "1:M",
  },
];

const mockTables: TableVm[] = [
  {
    id: tagTableId,
    x: 100,
    y: 150,
    tableName: "tags",
    fields: [
      {
        id: tagFieldId,
        name: "id",
        type: "number",
      },
      {
        id: GenerateGUID(),
        name: "name",
        type: "string",
      },
    ],
  },
  {
    id: restaurantTableId,
    x: 500,
    y: 80,
    tableName: "Restaurant",
    fields: [
      {
        id: GenerateGUID(),
        name: "id",
        type: "number",
      },
      {
        id: GenerateGUID(),
        name: "name",
        type: "string",
      },
      {
        id: GenerateGUID(),
        name: "menu",
        type: "object",
        children: [
          {
            id: GenerateGUID(),
            name: "id",
            type: "number",
          },
          {
            id: GenerateGUID(),
            name: "category",
            type: "string",
          },
          {
            id: GenerateGUID(),
            name: "dishes",
            type: "object",
            children: [
              {
                id: GenerateGUID(),
                name: "id",
                type: "number",
              },
              {
                id: GenerateGUID(),
                name: "name",
                type: "string",
              },
              {
                id: GenerateGUID(),
                name: "price",
                type: "number",
              },
            ],
          },
        ],
      },
      {
        id: restaurantTagFieldGUID,
        name: "tags",
        type: "number",
      },
      {
        id: GenerateGUID(),
        name: "address",
        type: "object",
        children: [
          {
            id: GenerateGUID(),
            name: "street",
            type: "string",
          },
          {
            id: GenerateGUID(),
            name: "city",
            type: "string",
          },
          {
            id: GenerateGUID(),
            name: "state",
            type: "string",
          },
          {
            id: GenerateGUID(),
            name: "zip",
            type: "number",
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
