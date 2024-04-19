import React from 'react';
import classes from './canvas-accessible.pod.module.css';
import { CanvasAccessibleComponent } from './canvas-accessible.component';
import { DatabaseSchemaVm, TableVm } from '@/core/providers';

interface CanvasAccessibleProps {
  canvasSchema: DatabaseSchemaVm;
  onEditTable: (table: TableVm) => void;
  onDeleteSelectedItem: (tableId: string) => void;
}
export const CanvasAccessible: React.FC<CanvasAccessibleProps> = props => {
  const { canvasSchema, onEditTable, onDeleteSelectedItem } = props;

  const canvasAccessibleRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (canvasAccessibleRef.current) {
      canvasAccessibleRef.current.focus();
    }
  }, []);

  return (
    //Maybe it needs something for better accessibility.
    //Before, the screen reader read all the content and displayed
    // the levels of the titles and the list of items, now read all like plain text.
    <section
      className={classes.screenReaderOnly}
      tabIndex={-1}
      ref={canvasAccessibleRef}
      aria-live="polite"
    >
      <CanvasAccessibleComponent
        canvasSchema={canvasSchema}
        onEditTable={onEditTable}
        onDeleteSelectedItem={onDeleteSelectedItem}
      />
    </section>
  );
};
