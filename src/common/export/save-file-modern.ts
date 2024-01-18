export const saveFileModern = async (content: string) => {
  try {
    const newFileHandle = await window.showSaveFilePicker({
      suggestedName: 'nuevo_nombre.txt',
    });
    const writableStream = await newFileHandle.createWritable();
    await writableStream.write(content);
    await writableStream.close();
  } catch (error) {
    throw new Error('Error save file: ' + error);
  }
};
