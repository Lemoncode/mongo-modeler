import { ModalDialog } from '@/common/components';
import { useDeviceContext, useModalDialogContext } from '@/core/providers';
import { useVSCodeSync } from '@/core/vscode';
import { CanvasPod } from '@/pods/canvas/canvas.pod';
import { FloatingBarPod } from '@/pods/floating-bar';
import { FooterPod } from '@/pods/footer';
import { ToolbarPod } from '@/pods/toolbar/toolbar.pod';
import classes from './main.scene.module.css';

export const MainScene: React.FC = () => {
  const { modalDialog } = useModalDialogContext();
  const { isTabletOrMobileDevice } = useDeviceContext();

  useVSCodeSync();

  return (
    <>
      <div className={classes.container} aria-hidden={modalDialog.isOpen}>
        <ToolbarPod />
        <CanvasPod />
        {!isTabletOrMobileDevice && <FloatingBarPod />}
        <FooterPod />
      </div>
      <ModalDialog />
    </>
  );
};
