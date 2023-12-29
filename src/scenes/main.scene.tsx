import { CanvasPod } from '@/pods/canvas/canvas.pod';
import { ToolbarPod } from '@/pods/toolbar/toolbar.pod';
import classes from './main.scene.module.css';
import {
  CanvasViewSettingsProvider,
  ModalDialogProvider,
} from '@/core/providers';
import { ModalDialog } from '@/common/components';

export const MainScene: React.FC = () => {
  return (
    <div className={classes.container}>
      <CanvasViewSettingsProvider>
        test
        <ModalDialogProvider>
          <ToolbarPod />
          <CanvasPod />
          <ModalDialog />
        </ModalDialogProvider>
      </CanvasViewSettingsProvider>
    </div>
  );
};
