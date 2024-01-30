import { Coords, GUID, Size } from '@/core/model';
import { DatabaseSchemaVm, TableVm } from '@/core/providers/canvas-schema';
import { DatabaseTable } from './components/table/database-table.component';
import { DatabaseRelationCollectionComponent } from './components/relation';

interface Props {
  viewBoxSize: Size;
  canvasSize: Size;
  canvasSchema: DatabaseSchemaVm;
  onUpdateTablePosition: (
    id: string,
    position: Coords,
    totalHeight: number,
    canvasSize: Size
  ) => void;
  onToggleCollapse: (tableId: GUID, fieldId: GUID) => void;
  onEditTable: (tableInfo: TableVm) => void;
}

export const CanvasExportSvgComponent: React.FC<Props> = props => {
  const {
    // viewBoxSize,
    canvasSize,
    canvasSchema,
    onUpdateTablePosition,
    onToggleCollapse,
    onEditTable,
  } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${canvasSize.width} ${canvasSize.height}`}
      width={canvasSize.width}
      height={canvasSize.height}
    >
      {canvasSchema.tables.map(table => (
        <DatabaseTable
          key={table.id}
          tableInfo={table}
          updatePosition={onUpdateTablePosition}
          onToggleCollapse={onToggleCollapse}
          onEditTable={onEditTable}
          canvasSize={canvasSize}
        />
      ))}
      <DatabaseRelationCollectionComponent schema={canvasSchema} />
    </svg>
  );
};
