import React from 'react';
import classes from './canvas-accessible.pod.module.css';
import { CanvasAccessibleComponent } from './canvas-accessible.component';
import { DatabaseSchemaVm } from '@/core/providers';
import { GUID } from '@/core/model';

interface CanvasAccessibleProps {
  canvasSchema: DatabaseSchemaVm;
  onEditRelation: (relationId: GUID) => void;
  deleteSelectedItem: (selectedItemId: string) => void;
}
export const CanvasAccessible: React.FC<CanvasAccessibleProps> = props => {
  const { canvasSchema, onEditRelation, deleteSelectedItem } = props;

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
        onEditRelation={onEditRelation}
        deleteSelectedItem={deleteSelectedItem}
      />
    </section>
  );
};
