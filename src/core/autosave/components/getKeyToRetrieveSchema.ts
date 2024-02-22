export const getKeyToRetrieveSchema = (AUTOSAVE_KEY: string): string => {
  const lookingForSavedSchemasKeys = Object.keys(localStorage).filter(key =>
    key.startsWith(AUTOSAVE_KEY)
  );

  if (lookingForSavedSchemasKeys.length === 1) {
    const uniqueKey = lookingForSavedSchemasKeys[0];
    return uniqueKey;
  } else if (lookingForSavedSchemasKeys.length > 1) {
    const selectedKey = prompt(
      `Select which one you want to load: ${lookingForSavedSchemasKeys.join(', ')}`
    );
    if (selectedKey && lookingForSavedSchemasKeys.includes(selectedKey)) {
      return selectedKey;
    }
  }
  return AUTOSAVE_KEY;
};
