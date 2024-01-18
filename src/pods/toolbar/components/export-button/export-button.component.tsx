import React from 'react';
import { Size } from '@/core/model';
import { downloadImage } from '@/common/export';
// import { downloadSvg } from '@/common/export';
import { ExportIcon } from '@/common/components/icons/export-icon.component';
import { useCanvasViewSettingsContext } from '@/core/providers';
import { useCanvasSchemaContext } from '@/core/providers/canvas-schema';
import { CanvasExportSvgComponent } from '@/pods/export/canvas-export-svg.component';
import classes from '@/pods/toolbar/toolbar.pod.module.css';
import { ToolbarButton } from '../toolbar-button/toolbarButton.component';
import { TableVm } from '@/core/providers/canvas-schema';

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

  // # 108 Calculate furthest X,Y position used by the canvas table

  // with reduce
  // const getMaxXFromSchemaTables = (tables: TableVm[]): { x: number } => {
  //   const maxX = tables.reduce(
  //     (max, table) => (table.x > max ? table.x : max),
  //     tables[0].x
  //   );

  //   return { x: maxX };
  // };

  //with forEach
  const getMaxXFromSchemaTables = (tables: TableVm[]): { x: number } => {
    let maxX = 0;

    tables.forEach(table => {
      if (table.x > maxX) {
        maxX = table.x;
      }
    });

    return { x: maxX };
  };

  // const exportSvg = () => {
  //   const svg = (
  //     <CanvasExportSvgComponent
  //       viewBoxSize={viewBoxSize}
  //       canvasSize={canvasSize}
  //       canvasSchema={canvasSchema}
  //       onUpdateTablePosition={() => {}}
  //       onToggleCollapse={() => {}}
  //       onEditTable={() => {}}
  //     />
  //   );

  //   downloadSvg(svg);
  // };

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

    downloadImage(svg, viewBoxSize);
  };

  return (
    <ToolbarButton
      icon={<ExportIcon />}
      label="Export"
      // onClick={exportSvg}
      onClick={exportImage}
      className={classes.button}
    />
  );
};
