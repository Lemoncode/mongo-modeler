import ReactDOMServer from 'react-dom/server';

export const downloadSvg = (svg: JSX.Element) => {
  const svgString = ReactDOMServer.renderToStaticMarkup(svg);
  const blob = new Blob([svgString], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = 'my-image.svg';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
