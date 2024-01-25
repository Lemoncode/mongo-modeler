import { doFieldToggleCollapseLogic } from '../canvas.business';
import { DatabaseSchemaVm } from '@/core/providers/canvas-schema/canvas-schema.model';

describe('doFieldToggleCollapseLogic', () => {
  it('should toggle the collapse state of the specified field in the specified table', () => {
    const fieldInfo = { tableId: 'table1', fieldId: 'field1' };
    const currentSchema: DatabaseSchemaVm = {
      selectedElementId: null,
      tables: [
        {
          id: 'table1',
          tableName: 'Table 1',
          x: 0,
          y: 0,
          fields: [
            {
              id: 'field1',
              PK: false,
              name: 'Field 1',
              type: 'string',
              isCollapsed: false,
            },
            {
              id: 'field2',
              PK: true,
              name: 'Field 2',
              type: 'int',
              isCollapsed: false,
            },
          ],
        },
      ],
      relations: [],
    };

    expect(currentSchema.tables[0].fields[0].isCollapsed).toBe(false);

    const updatedSchema = doFieldToggleCollapseLogic(
      currentSchema,
      fieldInfo.tableId,
      fieldInfo.fieldId
    );

    expect(updatedSchema.tables[0].fields[0].isCollapsed).toBe(true);
  });

  it('should not modify the schema if the table or field is not found', () => {
    const fieldInfo = { tableId: 'tableNotFound', fieldId: 'fieldNotFound' };
    const currentSchema: DatabaseSchemaVm = {
      selectedElementId: null,
      tables: [
        {
          id: 'table1',
          tableName: 'Table 1',
          x: 0,
          y: 0,
          fields: [
            {
              id: 'field1',
              PK: false,
              name: 'Field 1',
              type: 'string',
              isCollapsed: false,
            },
            {
              id: 'field2',
              PK: true,
              name: 'Field 2',
              type: 'int',
              isCollapsed: false,
            },
          ],
        },
      ],
      relations: [],
    };

    const updatedSchema = doFieldToggleCollapseLogic(
      currentSchema,
      fieldInfo.tableId,
      fieldInfo.fieldId
    );

    expect(updatedSchema).toEqual(currentSchema);
  });
});
