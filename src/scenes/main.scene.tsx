import { CanvasPod } from '@/pods/canvas/canvas.pod';
import { ToolbarPod } from '@/pods/toolbar/toolbar.pod';
import { ModalDialogProvider } from '@/core/providers';
import { ModalDialog } from '@/common/components';
import classes from './main.scene.module.css';
import { FooterPod } from '@/pods/footer';

export const MainScene: React.FC = () => {
  return (
    <div className={classes.container}>
      <ModalDialogProvider>
        <ToolbarPod />
        <CanvasPod />
        <ModalDialog />
        <FooterPod />
      </ModalDialogProvider>
    </div>
  );
};
