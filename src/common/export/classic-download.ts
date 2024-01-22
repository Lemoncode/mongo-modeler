export const initiateDownload = (url: string, name: string) => {
  const link = document.createElement('a');
  link.href = url;
  link.download = name;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const downloadFile = (
  filename: string,
  content: string,
  contentType: string
) => {
  const blob = new Blob([content], { type: contentType });
  const contentUrl = URL.createObjectURL(blob);
  initiateDownload(contentUrl, filename);
};
