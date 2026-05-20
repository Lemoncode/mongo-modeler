export const retrieveValueFromLocalStorage = (key: string) => {
  const storedValue = localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : null;
};

export const saveValueToLocalStorage = <T>(key: string, value: T): void => {
  const serializedValue = JSON.stringify(value);
  localStorage.setItem(key, serializedValue);
};
