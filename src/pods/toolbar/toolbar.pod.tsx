import { useCanvasViewSettingsContext } from '@/core/providers';
import classes from './toolbar.pod.module.css';

export const ToolbarPod: React.FC = () => {
  const { zoomIn, zoomOut } = useCanvasViewSettingsContext();
  return (
    <div className={classes.container}>
      <h1>Toolbar Pod</h1>
      <button onClick={zoomIn}>Zoom in</button>
      <button onClick={zoomOut}>Zoom out</button>
    </div>
  );
};
