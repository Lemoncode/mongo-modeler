import React from 'react';
import { EDIT_COLLECTION_TITLE, ExportIcon } from '@/common/components';
import { downloadImage, downloadSvg } from '@/common/export';
import { ExportType, Size } from '@/core/model';
import {
  useModalDialogContext,
  useCanvasSchemaContext,
  useCanvasViewSettingsContext,
  TABLE_CONST,
} from '@/core/providers';
import { ExportTablePod, CanvasExportSvgComponent } from '@/pods/export';
import { ToolbarButton } from '../toolbar-button/toolbarButton.component';
import classes from '@/pods/toolbar/toolbar.pod.module.css';
import {
  getMaxPositionYFromTables,
  getMaxPositionXFromTables,
} from './export-button.business';

export const ExportButton = () => {
  const { openModal } = useModalDialogContext();
  const { canvasSchema } = useCanvasSchemaContext();
  const { canvasViewSettings } = useCanvasViewSettingsContext();

  const { canvasSize, zoomFactor } = canvasViewSettings;

  const downloadCanvasSize: Size = React.useMemo<Size>(
    () => ({
      width:
        getMaxPositionXFromTables(canvasSchema.tables) +
        TABLE_CONST.TABLE_WIDTH +
        TABLE_CONST.CANVAS_PADDING,
      height:
        getMaxPositionYFromTables(canvasSchema.tables) +
        TABLE_CONST.CANVAS_PADDING,
    }),
    [zoomFactor, canvasSize, canvasSchema.tables]
  );

  const exportSvg = () => {
    const svg = (
      <CanvasExportSvgComponent
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
