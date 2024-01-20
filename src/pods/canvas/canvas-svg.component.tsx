import { Coords, GUID, Size } from '@/core/model';
import classes from './canvas.pod.module.css';
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
  onEditRelation: (relationId: GUID) => void;
  onSelectElement: (relationId: GUID | null) => void;
}

export const CanvasSvgComponent: React.FC<Props> = props => {
  const {
    viewBoxSize,
    canvasSize,
    canvasSchema,
    onUpdateTablePosition,
    onToggleCollapse,
    onEditTable,
    onEditRelation,
    onSelectElement,
  } = props;

  const clearSelection = () => {
    onSelectElement(null);
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={classes.containerSvg}
      viewBox={`0 0 ${viewBoxSize.width} ${viewBoxSize.height}`}
      width={canvasSize.width}
      height={canvasSize.height}
      onClick={clearSelection}
    >
      {canvasSchema.tables.map(table => (
        <DatabaseTable
          key={table.id}
          tableInfo={table}
          updatePosition={onUpdateTablePosition}
          onToggleCollapse={onToggleCollapse}
          onEditTable={onEditTable}
          canvasSize={canvasSize}
          isSelected={canvasSchema.selectedElementId === table.id}
          selectTable={onSelectElement}
        />
      ))}
      <DatabaseRelationCollectionComponent
        schema={canvasSchema}
        onEditRelation={onEditRelation}
        onSelectRelation={onSelectElement}
      />
    </svg>
  );
};
