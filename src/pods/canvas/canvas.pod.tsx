import React from 'react';
import {
  useCanvasViewSettingsContext,
  useDeviceContext,
  useModalDialogContext,
} from '@/core/providers';
import { GUID, Size } from '@/core/model';
import classes from './canvas.pod.module.css';
import {
  RelationVm,
  TableVm,
  useCanvasSchemaContext,
} from '@/core/providers/canvas-schema';
import { EditTablePod } from '../edit-table';
import {
  EDIT_RELATION_TITLE,
  EDIT_COLLECTION_TITLE,
} from '@/common/components/modal-dialog';
import { CanvasSvgComponent } from './canvas-svg.component';
import { EditRelationPod } from '../edit-relation';
import { mFlix } from './m-flix.mock.data';

export const CanvasPod: React.FC = () => {
  const { openModal, closeModal, modalDialog } = useModalDialogContext();
  const {
    canvasSchema,
    updateTablePosition,
    updateFullTable,
    doFieldToggleCollapse,
    doSelectElement,
    updateFullRelation,
    doUndo,
    doRedo,
    deleteSelectedItem,
    loadSchema,
  } = useCanvasSchemaContext();
  const { canvasViewSettings, setScrollPosition, setLoadSample } =
    useCanvasViewSettingsContext();
  const { canvasSize, zoomFactor, loadSample } = canvasViewSettings;

  const { isDevice } = useDeviceContext();
  // TODO: This is temporary code, once we get load and save
  // we won't need to load this mock data
  // From now onwards use the examples under db-examples folder
  // Open ...
  /*
  React.useEffect(() => {
    loadSchema(mockSchema);
  }, []);
  */
  const viewBoxSize: Size = React.useMemo<Size>(
    () => ({
      width: canvasSize.width * zoomFactor,
      height: canvasSize.height * zoomFactor,
    }),
    [zoomFactor, canvasSize]
  );

  const handleToggleCollapse = (tableId: GUID, fieldId: GUID) => {
    doFieldToggleCollapse(tableId, fieldId);
  };

  const handleTableEditUpdate = (table: TableVm) => {
    updateFullTable(table);
    closeModal();
  };

  const handleCloseEditTable = () => {
    closeModal();
  };

  const handleEditTable = (tableInfo: TableVm) => {
    if (isDevice) return;
    openModal(
      <EditTablePod
        table={tableInfo}
        relations={canvasSchema.relations}
        onSave={handleTableEditUpdate}
        onClose={handleCloseEditTable}
      />,
      EDIT_COLLECTION_TITLE
    );
  };

  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (containerRef.current) {
      setScrollPosition({
        x: containerRef.current.scrollLeft,
        y: containerRef.current.scrollTop,
      });
    }
  };

  const handleChangeRelation = (relation: RelationVm) => {
    updateFullRelation(relation);
    closeModal();
  };
  const handleCloseEditRelation = () => {
    closeModal();
  };

  const handleEditRelation = (relationId: GUID) => {
    if (isDevice) return;
    openModal(
      <EditRelationPod
        onChangeRelation={handleChangeRelation}
        canvasSchema={canvasSchema}
        relationId={relationId}
        onClose={handleCloseEditRelation}
      />,
      EDIT_RELATION_TITLE
    );
  };

  const onSelectElement = (relationId: GUID | null) => {
    doSelectElement(relationId);
  };

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      //Support for MetaKey in Firefox is available only from version 118 onwards,
      // and we are currently on version 121. Should we consider implementing support for older versions?
      if (e.metaKey && e.key === 'z' && !e.shiftKey) {
        doUndo();
      }

      if (e.metaKey && e.shiftKey && e.key === 'z') {
        doRedo();
      }

      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (canvasSchema.selectedElementId) {
          deleteSelectedItem(canvasSchema.selectedElementId);
        }
      }
    };

    modalDialog.isOpen
      ? document.removeEventListener('keydown', handleKeyDown)
      : document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [modalDialog.isOpen, canvasSchema.selectedElementId]);

  return (
    <div
      className={classes.container}
      ref={containerRef}
      onScroll={handleScroll}
    >
      {loadSample && (
        <div className={classes.load}>
          <button
            className={classes.loadButton}
            onClick={() => {
              loadSchema(mFlix);
              setLoadSample(false);
            }}
          >
            Load sample model
          </button>
        </div>
      )}
      <CanvasSvgComponent
        viewBoxSize={viewBoxSize}
        canvasSize={canvasSize}
        canvasSchema={canvasSchema}
        onUpdateTablePosition={updateTablePosition}
        onToggleCollapse={handleToggleCollapse}
        onEditTable={handleEditTable}
        onEditRelation={handleEditRelation}
        onSelectElement={onSelectElement}
        isDevice={isDevice}
      />
    </div>
  );
};
