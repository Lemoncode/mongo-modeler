export const retrieveValueFromLocalStorage = <T>(key: string): T | null => {
  try {
    const storedValue = localStorage.getItem(key);
    if (storedValue !== null) {
      return JSON.parse(storedValue);
    }

    return null;
  } catch (error) {
    throw new Error(`Error retrieving ${key} from localStorage: ${error}`);
  }
};

export const saveValueToLocalStorage = <T>(key: string, value: T): void => {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    throw new Error(`Error saving ${key} to localStorage: ${error}`);
  }
};
