import React from 'react';
import { EDIT_COLLECTION_TITLE, ExportIcon } from '@/common/components';
import { downloadImage, downloadSvg } from '@/common/export';
import { ExportType, Size } from '@/core/model';
import {
  useModalDialogContext,
  useCanvasSchemaContext,
  useCanvasViewSettingsContext,
  TableVm,
  TABLE_CONST,
} from '@/core/providers';
import { ExportTablePod, CanvasExportSvgComponent } from '@/pods/export';
import { ToolbarButton } from '../toolbar-button/toolbarButton.component';
import classes from '@/pods/toolbar/toolbar.pod.module.css';

export const ExportButton = () => {
  const { openModal } = useModalDialogContext();
  const { canvasSchema } = useCanvasSchemaContext();
  const { canvasViewSettings } = useCanvasViewSettingsContext();

  const { canvasSize, zoomFactor } = canvasViewSettings;

  const getMaxXFromSchemaTables = (tables: TableVm[]): { x: number } => {
    if (tables.length === 0) {
      return { x: 0 };
    }
    const maxX = tables.reduce(
      (max, table) => (table.x > max ? table.x : max),
      tables[0].x
    );

    return { x: maxX };
  };

  const maxX = getMaxXFromSchemaTables(canvasSchema.tables)?.x;

  let viewBoxSize: Size = React.useMemo<Size>(
    () => ({
      width: (maxX + TABLE_CONST.TABLE_WIDTH) * zoomFactor,
      height: canvasSize.height * zoomFactor,
    }),
    [zoomFactor, canvasSize, maxX]
  );

  // console.log('canvasSize.width', canvasSize.width - (maxX + TABLE_CONST.TABLE_WIDTH));
  const exportSvg = () => {
    // viewBoxSize = { ...viewBoxSize, width: maxX };

    const svg = (
      <CanvasExportSvgComponent
        viewBoxSize={viewBoxSize}
        canvasSize={canvasSize}
        canvasSchema={canvasSchema}
        onUpdateTablePosition={() => {}}
        onToggleCollapse={() => {}}
        onEditTable={() => {}}
      />
    );

    downloadSvg(svg);
  };

  const exportImage = () => {
    const image = (
      <CanvasExportSvgComponent
        viewBoxSize={viewBoxSize}
        canvasSize={canvasSize}
        canvasSchema={canvasSchema}
        onUpdateTablePosition={() => {}}
        onToggleCollapse={() => {}}
        onEditTable={() => {}}
      />
    );

    downloadImage(image, viewBoxSize);
  };

  const handleExportToFormat = (exportType: ExportType) => {
    switch (exportType) {
      case 'svg':
        exportSvg();
        break;
      case 'png':
        exportImage();
        break;
      default:
        break;
    }
  };

  const handleExportClick = () => {
    openModal(
      <ExportTablePod onExport={handleExportToFormat} />,
      EDIT_COLLECTION_TITLE
    );
  };

  return (
    <ToolbarButton
      icon={<ExportIcon />}
      label="Export"
      onClick={handleExportClick}
      className={classes.button}
    />
  );
};
