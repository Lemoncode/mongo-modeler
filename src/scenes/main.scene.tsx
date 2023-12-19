import { CanvasPod } from "@/pods/canvas/canvas.pod";
import { ToolbarPod } from "@/pods/toolbar/toolbar.pod";
import classes from "./main.scene.module.css";

export const MainScene: React.FC = () => {
  return (
    <div className={classes.container}>
      {/* Envolvemos con el provider toolbar y canvas*/}
      <ToolbarPod />
      <CanvasPod />
    </div>
  );
};
