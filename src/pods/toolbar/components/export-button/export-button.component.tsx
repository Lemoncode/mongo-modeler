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

  const getMaxXFromSchemaTables = (tables: TableVm[]): number => {
    if (tables.length === 0) return 0;
    return tables.sort((tableA, tableB) => tableB.x - tableA.x)[0].x;
  };

  const getMaxX = React.useMemo<number>(
    () => getMaxXFromSchemaTables(canvasSchema.tables),
    [canvasSchema.tables]
  );

  const viewBoxSize: Size = React.useMemo<Size>(
    () => ({
      width: getMaxX + TABLE_CONST.TABLE_WIDTH,
      height: canvasSize.height,
    }),
    [zoomFactor, canvasSize, getMaxX]
  );

  const downloadCanvasSize: Size = React.useMemo<Size>(
    () => ({
      ...canvasSize,
      width: getMaxX + TABLE_CONST.TABLE_WIDTH,
    }),
    [zoomFactor, canvasSize, getMaxX]
  );

  const exportSvg = () => {
    const svg = (
      <CanvasExportSvgComponent
        viewBoxSize={viewBoxSize}
        canvasSize={downloadCanvasSize}
        canvasSchema={canvasSchema}
        onUpdateTablePosition={() => {}}
        onToggleCollapse={() => {}}
        onEditTable={() => {}}
      />
    );

    downloadSvg(svg);
  };

  const exportImage = () => {
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

    downloadImage(svg, downloadCanvasSize);
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
