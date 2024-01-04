import React from 'react';
import { useCanvasViewSettingsContext } from '@/core/providers';
import { EditRelation } from '@/pods/edit-realtion';
import { EditTable } from '@/pods/edit-table';
import { useModalDialogContext } from '@/core/providers/modal-dialog-provider';
import { ThemeToggleButton } from './components/themeToggleButton';
import classes from './toolbar.pod.module.css';

export const ToolbarPod: React.FC = () => {
  const { zoomIn, zoomOut, canvasViewSettings, setCanvasSize } =
    useCanvasViewSettingsContext();
  const { openModal, closeModal } = useModalDialogContext();
  const handleRelationClick = () => {
    openModal(<EditRelation />);
  };
  const handleEditTableClick = () => {
    openModal(<EditTable />);
  };
  return (
    <div className={classes.container}>
      <h1>Toolbar</h1>
      <div className={classes.buttonContent}>
        <button className={classes.buttonZoomIn} onClick={zoomIn}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='1.2em'
            height='1.2em'
            viewBox='0 0 256 256'
          >
            <path d='M150 112a6 6 0 0 1-6 6h-26v26a6 6 0 0 1-12 0v-26H80a6 6 0 0 1 0-12h26V80a6 6 0 0 1 12 0v26h26a6 6 0 0 1 6 6m78.24 116.24a6 6 0 0 1-8.48 0l-51.38-51.38a86.15 86.15 0 1 1 8.48-8.48l51.38 51.38a6 6 0 0 1 0 8.48M112 186a74 74 0 1 0-74-74a74.09 74.09 0 0 0 74 74' />
          </svg>
        </button>
        <button className={classes.buttonZoomOut} onClick={zoomOut}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='1.2em'
            height='1.2em'
            viewBox='0 0 256 256'
          >
            <path d='M150 112a6 6 0 0 1-6 6H80a6 6 0 0 1 0-12h64a6 6 0 0 1 6 6m78.24 116.24a6 6 0 0 1-8.48 0l-51.38-51.38a86.15 86.15 0 1 1 8.48-8.48l51.38 51.38a6 6 0 0 1 0 8.48M112 186a74 74 0 1 0-74-74a74.09 74.09 0 0 0 74 74' />
          </svg>
        </button>
        <button className={classes.buttonEdit} onClick={handleEditTableClick}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='1.2em'
            height='1.2em'
            viewBox='0 0 256 256'
          >
            <path d='M225.91 74.79L181.22 30.1a14 14 0 0 0-19.8 0L38.1 153.41a13.94 13.94 0 0 0-4.1 9.9V208a14 14 0 0 0 14 14h168a6 6 0 0 0 0-12H110.49L225.91 94.59a14 14 0 0 0 0-19.8M76.49 188L164 100.48L183.52 120L96 207.51ZM68 179.52L48.49 160L136 72.49L155.52 92ZM46 208v-33.52L81.52 210H48a2 2 0 0 1-2-2M217.42 86.1L192 111.52L144.49 64l25.41-25.41a2 2 0 0 1 2.83 0l44.69 44.68a2 2 0 0 1 0 2.83' />
          </svg>
        </button>
        <button
          className={classes.buttonRelation}
          onClick={handleRelationClick}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='1.2em'
            height='1.2em'
            viewBox='0 0 256 256'
          >
            <path d='M148.24 139.76a6 6 0 0 0-8.48 0L120 159.51L96.49 136l19.75-19.76a6 6 0 0 0-8.48-8.48L88 127.51l-19.76-19.75a6 6 0 0 0-8.48 8.48l7.75 7.76l-24.72 24.73a30 30 0 0 0 0 42.42l6.78 6.79l-29.81 29.82a6 6 0 1 0 8.48 8.48l29.82-29.81l6.79 6.78a30 30 0 0 0 42.42 0L132 188.49l7.76 7.75a6 6 0 0 0 8.48-8.48L128.49 168l19.75-19.76a6 6 0 0 0 0-8.48m-49.45 65a18 18 0 0 1-25.46 0l-22.06-22.09a18 18 0 0 1 0-25.46L76 132.49L123.51 180Zm137.45-185a6 6 0 0 0-8.48 0l-29.82 29.81l-6.79-6.78a30 30 0 0 0-42.42 0L124 67.51l-7.76-7.75a6 6 0 0 0-8.48 8.48l80 80a6 6 0 0 0 8.48-8.48l-7.75-7.76l24.72-24.73a30 30 0 0 0 0-42.42l-6.78-6.79l29.81-29.82a6 6 0 0 0 0-8.48m-31.51 79L180 123.51L132.49 76l24.72-24.73a18 18 0 0 1 25.46 0l22.06 22.06a18 18 0 0 1 0 25.46Z' />
          </svg>
        </button>
        <ThemeToggleButton/>
      </div>
    </div>
  );
};
