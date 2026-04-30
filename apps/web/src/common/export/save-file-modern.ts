interface FileInfo {
  filename: string;
  extension: string;
  description: string;
}

export const saveFileModern = async (
  fileInfo: FileInfo,
  content: string
): Promise<string> => {
  let savedFilename = '';
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

    savedFilename = newFileHandle.name;

    const writableStream = await newFileHandle.createWritable();
    await writableStream.write(content);
    await writableStream.close();
  } catch (error) {
    // Nothing to do here if user aborts filename
    // TODO: add later on more elaborated error handling
    // throw new Error('Error save file: ' + error);
  }

  return savedFilename;
};
