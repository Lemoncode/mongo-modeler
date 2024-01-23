export const retrieveValueFromLocalStorage = <T>(key: string): T | null => {
  const storedValue = localStorage.getItem(key);
  return storedValue !== null ? JSON.parse(storedValue) : null;
};

export const saveValueToLocalStorage = <T>(key: string, value: T): void => {
  const serializedValue = JSON.stringify(value);
  localStorage.setItem(key, serializedValue);
};
