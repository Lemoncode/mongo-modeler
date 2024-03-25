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
import { CANVAS_MAX_WIDTH, CanvasSvgComponent } from './canvas-svg.component';
import { EditRelationPod } from '../edit-relation';
import { mFlix } from './m-flix.mock.data';
import { CanvasAccessible } from './components/canvas-accessible';

const HEIGHT_OFFSET = 200;
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
    loadSchema,
  } = useCanvasSchemaContext();
  const { canvasViewSettings, setScrollPosition, setLoadSample } =
    useCanvasViewSettingsContext();
  const { canvasSize, zoomFactor, loadSample } = canvasViewSettings;

  const { isTabletOrMobileDevice } = useDeviceContext();
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
    if (isTabletOrMobileDevice) return;
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
    if (isTabletOrMobileDevice) return;
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
  const [sizeFrame, setSizeFrame] = React.useState<Size>({
    width: canvasSize.width,
    height: canvasSize.height,
  });

  React.useEffect(() => {
    const newSize = (CANVAS_MAX_WIDTH - viewBoxSize.width) / zoomFactor;

    setSizeFrame({
      width: canvasSize.width + newSize,
      height: canvasSize.width + newSize + HEIGHT_OFFSET / zoomFactor,
    });
  }, [viewBoxSize]);

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
      <div
        style={{
          width: sizeFrame.width,
          height: sizeFrame.height,
          overflow: 'hidden',
        }}
      >
        <CanvasSvgComponent
          viewBoxSize={viewBoxSize}
          canvasSize={canvasSize}
          canvasSchema={canvasSchema}
          onUpdateTablePosition={updateTablePosition}
          onToggleCollapse={handleToggleCollapse}
          onEditTable={handleEditTable}
          onEditRelation={handleEditRelation}
          onSelectElement={onSelectElement}
          isTabletOrMobileDevice={isTabletOrMobileDevice}
        />
        {!loadSample && <CanvasAccessible canvasSchema={canvasSchema} />}
      </div>
    </div>
  );
};
