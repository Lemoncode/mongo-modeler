export type OnFileSelectedCallback = (file: File) => void;

export const FileInput = (onFileSelected: OnFileSelectedCallback) => {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = '.mml';
  fileInput.addEventListener('change', event => {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    if (file) onFileSelected(file);
  });
  fileInput.click();
};
