import ReactDOMServer from 'react-dom/server';
import { Size } from '@/core/model';

const initiateDownload = (url: string, name: string) => {
  const link = document.createElement('a');
  link.href = url;
  link.download = name;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const downloadSvg = (svg: JSX.Element) => {
  const svgString = ReactDOMServer.renderToStaticMarkup(svg);
  const blob = new Blob([svgString], { type: 'image/svg+xml' });
  const svgUrl = URL.createObjectURL(blob);

  initiateDownload(svgUrl, 'my-image.svg');
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
      // TODO: export scaleFactor as a constant, comment with Braulio
      // add scale factor to see the image clearly
      const scaleFactor = 2;
      ctx.scale(scaleFactor, scaleFactor);
      ctx.drawImage(image, 0, 0);
      const imageUrl = canvas.toDataURL('image/png');

      initiateDownload(imageUrl, 'my-image.png');
    }
  };
};
