import { CanvasPod } from '@/pods/canvas/canvas.pod';
import { ToolbarPod } from '@/pods/toolbar/toolbar.pod';
import { useDeviceContext, useModalDialogContext } from '@/core/providers';
import { ModalDialog } from '@/common/components';
import classes from './main.scene.module.css';
import { FooterPod } from '@/pods/footer';
import { FloatingBarPod } from '@/pods/floating-bar';

export const MainScene: React.FC = () => {
  const { modalDialog } = useModalDialogContext();
  const { isTabletOrMobileDevice } = useDeviceContext();
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
