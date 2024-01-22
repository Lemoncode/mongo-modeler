export const retrieveValueFromLocalStorage = <T>(key: string): T | null => {
  try {
    const storedValue = localStorage.getItem(key);
    if (storedValue !== null) {
      if (typeof storedValue === 'string') {
        return storedValue as T;
      }
      return JSON.parse(storedValue);
    }

    return null;
  } catch (error) {
    throw new Error(`Error retrieving ${key} from localStorage: ${error}`);
  }
};
