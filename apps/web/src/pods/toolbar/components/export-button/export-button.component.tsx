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
  getMaxPositionYFromSchema,
  getTotalCanvasWidthFromSchema,
  normalizeTablesForExport,
  normalizeNotesForExport,
  getSchemaScriptFromTableVmArray,
  placeAllTablesWithoutOverlap,
  getMinPositionXFromTables,
} from './export-button.business';
import { ActionButton } from '@/common/components/action-button';
import { SHORTCUTS } from '@/common/shortcut';

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

  const getExportSchema = (showAllFieldsExpanded: boolean) => {
    const tablesToUse = showAllFieldsExpanded
      ? tablesWithExpandedFields
      : canvasSchema.tables;

    const minX = getMinPositionXFromTables(tablesToUse);
    const offsetX =
      minX < 0
        ? Math.abs(minX) + TABLE_CONST.CANVAS_PADDING
        : TABLE_CONST.CANVAS_PADDING;

    const normalizedTables = normalizeTablesForExport(tablesToUse);
    const normalizedNotes = normalizeNotesForExport(
      canvasSchema.notes,
      offsetX
    );

    return {
      ...canvasSchema,
      tables: normalizedTables,
      notes: normalizedNotes,
    };
  };

  const downloadCanvasSize: Size = React.useMemo<Size>(
    () => ({
      width:
        getTotalCanvasWidthFromSchema(
          tablesWithExpandedFields,
          canvasSchema.notes
        ) +
        TABLE_CONST.CANVAS_PADDING * 2, // Padding on both sides
      height:
        getMaxPositionYFromSchema(
          tablesWithExpandedFields,
          canvasSchema.notes
        ) + TABLE_CONST.CANVAS_PADDING,
    }),
    [zoomFactor, canvasSize, tablesWithExpandedFields, canvasSchema.notes]
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
    <ActionButton
      icon={<ExportIcon />}
      label="Export"
      onClick={handleExportClick}
      className="hide-mobile"
      shortcutOptions={SHORTCUTS.export}
      disabled={canvasSchema.tables.length < 1 && canvasSchema.notes.length < 1}
    />
  );
};
