import React from 'react';
import {
  useCanvasViewSettingsContext,
  useModalDialogContext,
} from '@/core/providers';
import { useCanvasSchemaContext } from '@/core/providers/canvas-schema';
import { Size } from '@/core/model';
import { downloadSvg } from '@/common/export/download-svg.business';
import { CanvasExportSvgComponent } from '@/pods/export/canvas-export-svg.component';
import classes from './export-table.module.css';

export const ExportTablePod = () => {
  const { canvasSchema } = useCanvasSchemaContext();
  const { closeModal } = useModalDialogContext();
  const { canvasViewSettings } = useCanvasViewSettingsContext();
  const { canvasSize, zoomFactor } = canvasViewSettings;
  const [selectedExportType, setSelectedExportType] = React.useState<
    string | null
  >(null);

  const viewBoxSize: Size = React.useMemo<Size>(
    () => ({
      width: canvasSize.width * zoomFactor,
      height: canvasSize.height * zoomFactor,
    }),
    [zoomFactor, canvasSize]
  );

  const exportSvg = () => {
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
    console.log('SVG Export');
    downloadSvg(svg);
  };

  const exportPng = () => {
    console.log('PNG Export');
  };

  const exportMongo = () => {
    console.log('Mongo Schema Export');
  };

  const handleExportType = (exportType: string) => {
    setSelectedExportType(exportType);
  };

  const handleExportClick = () => {
    switch (selectedExportType) {
      case 'svg':
        exportSvg();
        break;
      case 'png':
        exportPng();
        break;
      case 'mongo':
        exportMongo();
        break;
      default:
        alert('Unknown export type selected');
        console.log('Unknown export type');
        break;
    }
    closeModal();
  };
  return (
    <>
      <div className={classes.inputContent}>
        <label htmlFor="svg">
          <input
            type="radio"
            name="export type"
            id="svg"
            aria-label="SVG"
            onChange={() => handleExportType('svg')}
          />
          SVG
        </label>
        <label htmlFor="png">
          <input
            type="radio"
            name="export type"
            id="png"
            aria-label="PNG"
            onChange={() => handleExportType('png')}
          />
          PNG
        </label>
        <label htmlFor="mongo">
          <input
            type="radio"
            name="export type"
            id="mongo"
            aria-label="Mongo Schema"
            onChange={() => handleExportType('mongo')}
          />
          Mongo Schema
        </label>
      </div>
      <button className={classes.buttonExport} onClick={handleExportClick}>
        Export
      </button>
    </>
  );
};
