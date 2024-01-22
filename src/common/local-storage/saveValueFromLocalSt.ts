export const saveValueToLocalStorage = <T>(key: string, value: T): void => {
  try {
    if (typeof value !== 'string') {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } else {
      localStorage.setItem(key, value);
    }
  } catch (error) {
    throw new Error(`Error saving ${key} to localStorage: ${error}`);
  }
};
