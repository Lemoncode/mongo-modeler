import { GUID, Size } from '@/core/model';
import classes from './canvas.pod.module.css';
import {
  DatabaseSchemaVm,
  NoteVm,
  TableVm,
  UpdatePositionFn,
} from '@/core/providers/canvas-schema';
import { DatabaseTable } from './components/table/database-table.component';
import { DatabaseRelationCollectionComponent } from './components/relation';
import { SelectedTableFilterHighlightComponent } from './components/table/components/selected-table-filter-highlight.component';
import { CANVAS_MAX_HEIGHT, CANVAS_MAX_WIDTH } from '@/core/providers';
import { Note } from './components/note';

interface Props {
  viewBoxSize: Size;
  canvasSize: Size;
  zoomFactor: number;
  canvasSchema: DatabaseSchemaVm;
  onUpdateTablePosition: UpdatePositionFn;
  onUpdateNotePosition: UpdatePositionFn;
  onToggleCollapse: (tableId: GUID, fieldId: GUID) => void;
  onEditTable: (tableInfo: TableVm) => void;
  onEditNote: (noteInfo: NoteVm) => void;
  onEditRelation: (relationId: GUID) => void;
  onSelectElement: (relationId: GUID | null) => void;
  isTabletOrMobileDevice: boolean;
  updateTableWidth: (tableId: GUID, width: number) => void;
}

export const CanvasSvgComponent: React.FC<Props> = props => {
  const {
    viewBoxSize,
    canvasSize,
    zoomFactor,
    canvasSchema,
    onUpdateTablePosition,
    onUpdateNotePosition,
    onToggleCollapse,
    onEditTable,
    onEditNote,
    onEditRelation,
    onSelectElement,
    isTabletOrMobileDevice,
    updateTableWidth,
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
          updateTableWidth={updateTableWidth}
        />
      ))}
      {canvasSchema.notes.map(note => (
        <Note
          key={note.id}
          noteInfo={note}
          updatePosition={onUpdateNotePosition}
          onEditNote={onEditNote}
          canvasSize={canvasSize}
          isSelected={canvasSchema.selectedElementId === note.id}
          selectNote={onSelectElement}
          isTabletOrMobileDevice={isTabletOrMobileDevice}
          viewBoxSize={viewBoxSize}
          zoomFactor={zoomFactor}
        />
      ))}
    </svg>
  );
};
