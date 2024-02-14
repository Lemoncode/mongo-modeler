import React from 'react';
import { EDIT_COLLECTION_TITLE, ExportIcon } from '@/common/components';
import {
  downloadImage,
  downloadSchemaScript,
  downloadSvg,
} from '@/common/export';
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
  expandAllFieldsInTables,
  getMaxPositionYFromTables,
  getMaxPositionXFromTables,
  getSchemaScriptFromTableVmArray,
} from './export-button.business';
import { ToolbarButton } from '../toolbar-button/toolbarButton.component';
import classes from '@/pods/toolbar/toolbar.pod.module.css';
import { SHORTCUTS } from '../../shortcut/shortcut.const';

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
        canvasSchema={{ ...canvasSchema, tables: tablesWithExpandedFields }}
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
        canvasSchema={{ ...canvasSchema, tables: tablesWithExpandedFields }}
        onUpdateTablePosition={() => {}}
        onToggleCollapse={() => {}}
        onEditTable={() => {}}
      />
    );

    downloadImage(svg, downloadCanvasSize);
  };

  const exportSchema = () => {
    const schemaScript = getSchemaScriptFromTableVmArray(
      tablesWithExpandedFields
    );

    downloadSchemaScript(schemaScript);
  };

  const handleExportToFormat = (exportType: ExportType) => {
    switch (exportType) {
      case ExportType.SVG:
        exportSvg();
        break;
      case ExportType.PNG:
        exportImage();
        break;
      case ExportType.SCHEMA:
        exportSchema();
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
      shortcutOptions={SHORTCUTS.export}
    />
  );
};
