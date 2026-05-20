import ReactDOMServer from 'react-dom/server';
import { Size } from '@/core/model';
import { downloadFile, initiateDownload } from './classic-download';

export const downloadSvg = (svg: JSX.Element) => {
  const svgString = ReactDOMServer.renderToStaticMarkup(svg);
  downloadFile('diagram.svg', svgString, 'image/svg+xml');
};

export const downloadImage = (svg: JSX.Element, viewBoxSize: Size) => {
  const svgString = ReactDOMServer.renderToStaticMarkup(svg);

  const image = new Image();
  image.src = 'data:image/svg+xml,' + encodeURIComponent(svgString);
  image.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = viewBoxSize.width;
    canvas.height = viewBoxSize.height;

    const ctx = canvas.getContext('2d');

    if (ctx) {
      ctx.drawImage(image, 0, 0);
      const imageUrl = canvas.toDataURL('image/png');

      initiateDownload(imageUrl, 'my-image.png');
    }
  };
};

export const downloadSchemaScript = (schemaScript: string) => {
  downloadFile('schemaScript.js', schemaScript, 'text/javascript');
};
