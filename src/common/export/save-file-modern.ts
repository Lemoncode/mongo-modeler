interface FileInfo {
  filename: string;
  extension: string;
  description: string;
}

export const saveFileModern = async (fileInfo: FileInfo, content: string) => {
  const { filename, extension, description } = fileInfo;

  try {
    const newFileHandle = await window.showSaveFilePicker({
      suggestedName: filename,
      types: [
        {
          description,
          accept: {
            'text/plain': [`.${extension}`],
          },
        },
      ],
    });
    const writableStream = await newFileHandle.createWritable();
    await writableStream.write(content);
    await writableStream.close();
  } catch (error) {
    throw new Error('Error save file: ' + error);
  }
};
