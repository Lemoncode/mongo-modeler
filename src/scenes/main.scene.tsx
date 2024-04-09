import { CanvasPod } from '@/pods/canvas/canvas.pod';
import { ToolbarPod } from '@/pods/toolbar/toolbar.pod';
import { useModalDialogContext } from '@/core/providers';
import { ModalDialog } from '@/common/components';
import classes from './main.scene.module.css';
import { FooterPod } from '@/pods/footer';

export const MainScene: React.FC = () => {
  const { modalDialog } = useModalDialogContext();
  return (
    <>
      <div className={classes.container} aria-hidden={modalDialog.isOpen}>
        <ToolbarPod />
        <CanvasPod />
        <FooterPod />
      </div>
      <ModalDialog />
    </>
  );
};
