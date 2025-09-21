import React from 'react';
import { EXPORT_MODEL_TITLE, ExportIcon } from '@/common/components';
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
  placeAllTablesWithoutOverlap,
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

  const tablesWithoutOverlap = React.useMemo<TableVm[]>(
    () => placeAllTablesWithoutOverlap(canvasSchema.tables),
    [canvasSchema.tables]
  );

  const tablesWithExpandedFields = React.useMemo<TableVm[]>(
    () => expandAllFieldsInTables(tablesWithoutOverlap),
    [canvasSchema.tables]
  );

  const getExportSchema = (showAllFieldsExpanded: boolean) =>
    showAllFieldsExpanded
      ? {
          ...canvasSchema,
          tables: tablesWithExpandedFields,
        }
      : canvasSchema;

  const downloadCanvasSize: Size = React.useMemo<Size>(
    () => ({
      width:
        getMaxPositionXFromTables(tablesWithExpandedFields) +
        TABLE_CONST.DEFAULT_TABLE_WIDTH +
        TABLE_CONST.CANVAS_PADDING,
      height:
        getMaxPositionYFromTables(tablesWithExpandedFields) +
        TABLE_CONST.CANVAS_PADDING,
    }),
    [zoomFactor, canvasSize, tablesWithExpandedFields]
  );

  const exportSvg = (areAllFieldsExpanded: boolean) => {
    const svg = (
      <CanvasExportSvgComponent
        canvasSize={downloadCanvasSize}
        canvasSchema={getExportSchema(areAllFieldsExpanded)}
      />
    );

    downloadSvg(svg);
  };

  const exportImage = (areAllFieldsExpanded: boolean) => {
    const svg = (
      <CanvasExportSvgComponent
        canvasSize={downloadCanvasSize}
        canvasSchema={getExportSchema(areAllFieldsExpanded)}
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

  const handleExportToFormat = (
    exportType: ExportType,
    areAllFieldsExpanded: boolean
  ) => {
    switch (exportType) {
      case ExportType.SVG:
        exportSvg(areAllFieldsExpanded);
        break;
      case ExportType.PNG:
        exportImage(areAllFieldsExpanded);
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
      EXPORT_MODEL_TITLE
    );
  };

  return (
    <ToolbarButton
      icon={<ExportIcon />}
      label="Export"
      onClick={handleExportClick}
      className={`${classes.button} hide-mobile`}
      shortcutOptions={SHORTCUTS.export}
      disabled={canvasSchema.tables.length < 1}
    />
  );
};
