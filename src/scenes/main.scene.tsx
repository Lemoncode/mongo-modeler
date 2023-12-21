import { CanvasPod } from '@/pods/canvas/canvas.pod';
import { ToolbarPod } from '@/pods/toolbar/toolbar.pod';
import classes from './main.scene.module.css';
import { CanvasViewSettingsProvider } from '@/core/providers';

export const MainScene: React.FC = () => {
  return (
    <div className={classes.container}>
      <CanvasViewSettingsProvider>
        <ToolbarPod />
        <CanvasPod />
      </CanvasViewSettingsProvider>
    </div>
  );
};
