import classes from "./canvas.pod.module.css";

export const CanvasPod: React.FC = () => {
  return (
    <div className={classes.container}>
      <svg
        viewBox="0 0 100 100"
        style={{ border: "1px solid black" }}
        className={classes.containerSvg}
      >
        <rect x={0} y={0} width={10} height={15} fill="green" />
        <circle cx={40} cy={35} r={25} fill="red" />
      </svg>
    </div>
  );
};
