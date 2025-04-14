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
  ADD_COLLECTION_TITLE,
  ADD_RELATION_TITLE,
  MANAGE_INDEX_TITLE,
} from '@/common/components/modal-dialog';
import { CanvasSvgComponent } from './canvas-svg.component';
import { EditRelationPod } from '../edit-relation';
import { mFlix } from './m-flix.mock.data';
import { CanvasAccessible } from './components/canvas-accessible';
import useAutosave from '@/core/autosave/autosave.hook';
import { CANVAS_MAX_WIDTH } from '@/core/providers';
import { setOffSetZoomToCoords } from '@/common/helpers/set-off-set-zoom-to-coords.helper';
import { ManageIndexPod } from '../manage-index';

const HEIGHT_OFFSET = 200;
const BORDER_MARGIN = 40;
export const CanvasPod: React.FC = () => {
  const { openModal, closeModal, modalDialog } = useModalDialogContext();
  const {
    canvasSchema,
    addTable,
    addRelation,
    updateTablePosition,
    updateFullTable,
    updateFullTableByCheckingIndexes,
    doFieldToggleCollapse,
    doSelectElement,
    updateFullRelation,
    doUndo,
    doRedo,
    deleteSelectedItem,
    loadSchema,
    duplicateSelectedTable,
    copySelectedTable,
    pasteTable,
  } = useCanvasSchemaContext();
  const {
    canvasViewSettings,
    setScrollPosition,
    setLoadSample,
    setViewBoxSize,
  } = useCanvasViewSettingsContext();
  const { canvasSize, zoomFactor, loadSample, viewBoxSize } =
    canvasViewSettings;

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

  React.useEffect(() => {
    setViewBoxSize({
      width: canvasSize.width * zoomFactor,
      height: canvasSize.height * zoomFactor,
    });
  }, [canvasSize, zoomFactor]);

  const handleToggleCollapse = (tableId: GUID, fieldId: GUID) => {
    doFieldToggleCollapse(tableId, fieldId);
  };

  const handleAddTable = (newTable: TableVm) => {
    const updatedTable = {
      ...newTable,
      x: canvasViewSettings.scrollPosition.x + BORDER_MARGIN,
      y: canvasViewSettings.scrollPosition.y + BORDER_MARGIN,
    };

    addTable(updatedTable);
    closeModal();
  };

  const handleCloseModal = () => {
    closeModal();
  };

  const handleAddTableModal = () => {
    setLoadSample(false);
    openModal(
      <EditTablePod
        relations={canvasSchema.relations}
        onSave={handleAddTable}
        onClose={handleCloseModal}
      />,
      ADD_COLLECTION_TITLE
    );
  };

  const handleTableEditUpdate = (table: TableVm) => {
    updateFullTable(table);
    closeModal();
  };

  const handleEditTable = (tableInfo: TableVm) => {
    if (isTabletOrMobileDevice) return;
    openModal(
      <EditTablePod
        table={tableInfo}
        relations={canvasSchema.relations}
        onSave={handleTableEditUpdate}
        onClose={handleCloseModal}
      />,
      EDIT_COLLECTION_TITLE
    );
  };

  const handleManageIndexSave = (table: TableVm) => {
    const res = updateFullTableByCheckingIndexes(table);
    console.log(table);
    if (!res.isSuccessful) {
      alert(res.errorMessage);
      return;
    }
    closeModal();
  };

  const handleManageIndex = (tableInfo: TableVm) => {
    if (isTabletOrMobileDevice) return;
    openModal(
      <ManageIndexPod
        table={tableInfo}
        onSave={handleManageIndexSave}
        onClose={handleCloseModal}
      />,
      MANAGE_INDEX_TITLE
    );
  };

  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (containerRef.current) {
      setScrollPosition(
        setOffSetZoomToCoords(
          containerRef.current.scrollLeft,
          containerRef.current.scrollTop,
          viewBoxSize,
          canvasSize,
          zoomFactor
        )
      );
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

  const handleChangeCanvasSchema = (relation: RelationVm) => {
    addRelation(relation);
    closeModal();
  };

  const handleAddRelation = () => {
    if (isTabletOrMobileDevice) return;
    openModal(
      <EditRelationPod
        onChangeRelation={handleChangeCanvasSchema}
        canvasSchema={canvasSchema}
        onClose={handleCloseEditRelation}
      />,
      ADD_RELATION_TITLE
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

  const { retrieveAutosave, startAutosave, stopAutosave } = useAutosave();
  const [retrieveAutosaveHasInitialized, setRetrieveAutosaveHasInitialized] =
    React.useState(false);

  React.useEffect(() => {
    if (!retrieveAutosaveHasInitialized) {
      retrieveAutosave();
      setRetrieveAutosaveHasInitialized(true);
    }

    startAutosave();
    return stopAutosave;
  }, [canvasSchema]);

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

      // Add Cmd/Ctrl+D for duplicate
      if ((e.metaKey || e.ctrlKey) && e.key === 'd') {
        e.preventDefault(); // Prevent browser default
        duplicateSelectedTable();
      }

      // Add Cmd/Ctrl+C for copy
      if ((e.metaKey || e.ctrlKey) && e.key === 'c') {
        e.preventDefault(); // Prevent browser default
        copySelectedTable();
      }

      // Add Cmd/Ctrl+V for paste
      if ((e.metaKey || e.ctrlKey) && e.key === 'v') {
        e.preventDefault(); // Prevent browser default
        pasteTable();
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
    <main
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
          zoomFactor={zoomFactor}
          canvasSchema={canvasSchema}
          onUpdateTablePosition={updateTablePosition}
          onToggleCollapse={handleToggleCollapse}
          onEditTable={handleEditTable}
          onManageIndex={handleManageIndex}
          onEditRelation={handleEditRelation}
          onSelectElement={onSelectElement}
          isTabletOrMobileDevice={isTabletOrMobileDevice}
        />
        {!loadSample && (
          <CanvasAccessible
            canvasSchema={canvasSchema}
            onAddTableModal={handleAddTableModal}
            onAddRelationModal={handleAddRelation}
            onEditTable={handleEditTable}
            onEditRelation={handleEditRelation}
            onDeleteSelectedItem={deleteSelectedItem}
            isTabletOrMobileDevice={isTabletOrMobileDevice}
          />
        )}
      </div>
    </main>
  );
};
