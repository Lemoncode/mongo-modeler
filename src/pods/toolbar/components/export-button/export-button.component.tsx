import React from 'react';
import { EDIT_COLLECTION_TITLE, ExportIcon } from '@/common/components';
import { downloadImage, downloadSvg } from '@/common/export';
import { ExportType, Size } from '@/core/model';
import {
  useModalDialogContext,
  useCanvasSchemaContext,
  useCanvasViewSettingsContext,
  TABLE_CONST,
  TableVm,
} from '@/core/providers';
import { ExportTablePod, CanvasExportSvgComponent } from '@/pods/export';
import {
  getMaxPositionYFromTables,
  getMaxPositionXFromTables,
  expandAllFieldsInTables,
} from './export-button.business';
import { ToolbarButton } from '../toolbar-button/toolbarButton.component';
import classes from '@/pods/toolbar/toolbar.pod.module.css';

export const ExportButton = () => {
  const { openModal } = useModalDialogContext();
  const { canvasSchema } = useCanvasSchemaContext();
  const { canvasViewSettings } = useCanvasViewSettingsContext();

  const { canvasSize, zoomFactor } = canvasViewSettings;
  canvasSchema.tables;

  const tablesWithExpandedFields = React.useMemo<TableVm[]>(
    () => expandAllFieldsInTables(canvasSchema.tables),
    [canvasSchema.tables]
  );

  const getExportSchema = (showAllFieldsExpanded: boolean) =>
    showAllFieldsExpanded
      ? canvasSchema
      : {
          ...canvasSchema,
          tables: tablesWithExpandedFields,
        };

  const downloadCanvasSize: Size = React.useMemo<Size>(
    () => ({
      width:
        getMaxPositionXFromTables(tablesWithExpandedFields) +
        TABLE_CONST.TABLE_WIDTH +
        TABLE_CONST.CANVAS_PADDING,
      height:
        getMaxPositionYFromTables(tablesWithExpandedFields) +
        TABLE_CONST.CANVAS_PADDING,
    }),
    [zoomFactor, canvasSize, tablesWithExpandedFields]
  );

  const exportSvg = () => {
    const svg = (
      <CanvasExportSvgComponent
        canvasSize={downloadCanvasSize}
        canvasSchema={getExportSchema(false)}
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
        canvasSize={downloadCanvasSize}
        canvasSchema={getExportSchema(false)}
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
