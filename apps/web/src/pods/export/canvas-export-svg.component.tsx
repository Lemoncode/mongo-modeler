import { Size } from '@/core/model';
import { DatabaseSchemaVm } from '@/core/providers/canvas-schema';
import { DatabaseTable } from './components/table/database-table.component';
import { DatabaseRelationCollectionComponent } from './components/relation';
import { DatabaseNote } from './components/note';

interface Props {
  canvasSize: Size;
  canvasSchema: DatabaseSchemaVm;
}

export const CanvasExportSvgComponent: React.FC<Props> = props => {
  const { canvasSize, canvasSchema } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${canvasSize.width} ${canvasSize.height}`}
      width={canvasSize.width}
      height={canvasSize.height}
    >
      <DatabaseRelationCollectionComponent schema={canvasSchema} />
      {canvasSchema.tables.map(table => (
        <DatabaseTable key={table.id} tableInfo={table} />
      ))}
      {canvasSchema.notes.map(note => (
        <DatabaseNote key={note.id} noteInfo={note} />
      ))}
    </svg>
  );
};
