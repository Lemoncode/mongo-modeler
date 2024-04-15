import { GUID, Size } from '@/core/model';
import classes from './canvas.pod.module.css';
import {
  DatabaseSchemaVm,
  TableVm,
  UpdatePositionFn,
} from '@/core/providers/canvas-schema';
import { DatabaseTable } from './components/table/database-table.component';
import { DatabaseRelationCollectionComponent } from './components/relation';
import { SelectedTableFilterHighlightComponent } from './components/table/components/selected-table-filter-highlight.component';
import { CANVAS_MAX_HEIGHT, CANVAS_MAX_WIDTH } from '@/core/providers';
interface Props {
  viewBoxSize: Size;
  canvasSize: Size;
  zoomFactor: number;
  canvasSchema: DatabaseSchemaVm;
  onUpdateTablePosition: UpdatePositionFn;
  onToggleCollapse: (tableId: GUID, fieldId: GUID) => void;
  onEditTable: (tableInfo: TableVm) => void;
  onEditRelation: (relationId: GUID) => void;
  onSelectElement: (relationId: GUID | null) => void;
  isTabletOrMobileDevice: boolean;
}

export const CanvasSvgComponent: React.FC<Props> = props => {
  const {
    viewBoxSize,
    canvasSize,
    zoomFactor,
    canvasSchema,
    onUpdateTablePosition,
    onToggleCollapse,
    onEditTable,
    onEditRelation,
    onSelectElement,
    isTabletOrMobileDevice,
  } = props;

  const clearSelection = () => {
    onSelectElement(null);
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={classes.containerSvg}
      viewBox={`0 0 ${viewBoxSize.width} ${viewBoxSize.height}`}
      width={CANVAS_MAX_WIDTH}
      height={CANVAS_MAX_HEIGHT}
      onClick={clearSelection}
      aria-hidden={true}
    >
      <DatabaseRelationCollectionComponent
        schema={canvasSchema}
        onEditRelation={onEditRelation}
        onSelectRelation={onSelectElement}
      />
      <SelectedTableFilterHighlightComponent />
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
          isTabletOrMobileDevice={isTabletOrMobileDevice}
          viewBoxSize={viewBoxSize}
          zoomFactor={zoomFactor}
        />
      ))}
    </svg>
  );
};
