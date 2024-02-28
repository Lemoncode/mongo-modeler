import { CanvasPod } from '@/pods/canvas/canvas.pod';
import { ToolbarPod } from '@/pods/toolbar/toolbar.pod';
import {
  CanvasViewSettingsProvider,
  ModalDialogProvider,
} from '@/core/providers';
import { ModalDialog } from '@/common/components';
import { CanvasSchemaProvider } from '@/core/providers/canvas-schema';
import classes from './main.scene.module.css';
import { FooterPod } from '@/pods/footer';

export const MainScene: React.FC = () => {
  return (
    <div className={classes.container}>
      <CanvasViewSettingsProvider>
        <CanvasSchemaProvider>
          <ModalDialogProvider>
            <ToolbarPod />
            <CanvasPod />
            <FooterPod />
            <ModalDialog />
          </ModalDialogProvider>
        </CanvasSchemaProvider>
      </CanvasViewSettingsProvider>
    </div>
  );
};
