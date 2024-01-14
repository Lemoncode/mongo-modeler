import { Size } from '@/core/model';
import { ToolbarButton } from '../toolbar-button/toolbarButton.component';
import { ExportIcon } from '@/common/components/icons/export-icon.component';
import { useCanvasViewSettingsContext } from '@/core/providers';
import { useCanvasSchemaContext } from '@/core/providers/canvas-schema';
import classes from '@/pods/toolbar/toolbar.pod.module.css';
import React from 'react';
import { downloadSvg } from '@/common/export/download-svg.business';
import { CanvasExportSvgComponent } from '@/pods/export/canvas-export-svg.component';

export const ExportButton = () => {
  const { canvasSchema } = useCanvasSchemaContext();

  const { canvasViewSettings } = useCanvasViewSettingsContext();
  const { canvasSize, zoomFactor } = canvasViewSettings;

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

    downloadSvg(svg);
  };

  return (
    <ToolbarButton
      icon={<ExportIcon />}
      label="Export"
      onClick={exportSvg}
      className={classes.button}
    />
  );
};
