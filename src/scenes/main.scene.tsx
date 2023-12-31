import { CanvasPod } from '@/pods/canvas/canvas.pod';
import { ToolbarPod } from '@/pods/toolbar/toolbar.pod';
import {
  CanvasViewSettingsProvider,
  ModalDialogProvider,
} from '@/core/providers';
import { ModalDialog } from '@/common/components';
import { CanvasSchemaProvider } from '@/core/providers/canvas-schema';
import classes from './main.scene.module.css';

export const MainScene: React.FC = () => {
  return (
    <div className={classes.container}>
      <CanvasViewSettingsProvider>
        <CanvasSchemaProvider>
          <ModalDialogProvider>
            <ToolbarPod />
            <CanvasPod />
            <ModalDialog />
          </ModalDialogProvider>
        </CanvasSchemaProvider>
      </CanvasViewSettingsProvider>
    </div>
  );
};
