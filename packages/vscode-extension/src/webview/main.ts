import { setupBridge } from './bridge';

const appUrl = document.body.dataset.appUrl;
if (!appUrl) {
  throw new Error('[MongoModeler] Missing data-app-url attribute on <body>');
}

const appOrigin = new URL(appUrl).origin;

const iframe = document.createElement('iframe');
iframe.src = appUrl;
iframe.setAttribute(
  'sandbox',
  'allow-scripts allow-same-origin allow-downloads'
);
iframe.allow = 'clipboard-read; clipboard-write';
iframe.title = 'Mongo Modeler Application';
document.body.appendChild(iframe);

setupBridge(iframe, appOrigin);
