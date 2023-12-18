import React from "react";
import classes from "./canvas.pod.module.css";

interface Size {
  width: number;
  height: number;
}

export const CanvasPod: React.FC = () => {
  const [zoomFactor, setZoomFactor] = React.useState(1);
  const [size] = React.useState<Size>({ width: 2400, height: 2400 });

  const viewBoxSize: Size = React.useMemo<Size>(
    () => ({
      width: size.width * zoomFactor,
      height: size.height * zoomFactor,
    }),
    [zoomFactor, size]
  );

  return (
    <div>
      <button onClick={() => setZoomFactor((zoomFactor) => zoomFactor * 0.9)}>
        Zoom in
      </button>
      <button onClick={() => setZoomFactor((zoomFactor) => zoomFactor * 1.1)}>
        Zoom out
      </button>
      <div className={classes.container}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={classes.containerSvg}
          viewBox={`0 0 ${viewBoxSize.width} ${viewBoxSize.height}`} // Zoom play
          width={size.width} // Explicit SVG canvas width TODO: configure
          height={size.height} // Explicit SVG canvas height TODO: configure
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
