import React from 'react';
import classes from './canvas.pod.module.css';
import { useCanvasViewSettingsContext } from '@/core/providers';

interface Size {
  width: number;
  height: number;
}

export const CanvasPod: React.FC = () => {
  const { canvasViewSettings } = useCanvasViewSettingsContext();
  const { canvasSize, zoomFactor } = canvasViewSettings;

  const viewBoxSize: Size = React.useMemo<Size>(
    () => ({
      width: canvasSize.width * zoomFactor,
      height: canvasSize.height * zoomFactor
    }),
    [zoomFactor, canvasSize]
  );

  return (
    <div>
      <div className={classes.container}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={classes.containerSvg}
          viewBox={`0 0 ${viewBoxSize.width} ${viewBoxSize.height}`} // Zoom play
          width={canvasSize.width} // Explicit SVG canvas width TODO: configure
          height={canvasSize.height} // Explicit SVG canvas height TODO: configure
        >
          <rect x={100} y={0} width={190} height={280} fill="green" />
          <rect x={100} y={285} width={190} height={280} fill="yellow" />
          <rect x={195} y={0} width={300} height={15} fill="blue" />
          <rect x={510} y={0} width={300} height={15} fill="red" />
          <circle cx={40} cy={35} r={25} fill="red" />
        </svg>
      </div>
    </div>
  );
};
