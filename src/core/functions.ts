import { IndexField } from './providers';

export const isNullOrWhiteSpace = (str?: string) => !str?.trim();

export const parseManageIndexFields = (fieldsString?: string): IndexField[] => {
  const fields = fieldsString
    ?.split(/\s*,\s*/) // Split by commas with spaces
    ?.map(field => {
      const [name, ...orderParts] = field.trim().split(/\s+/); // Split by one or more spaces
      return { name, orderMethod: orderParts.join(' ') }; // Handle multi-word order methods
    });
  return fields?.filter(x => !isNullOrWhiteSpace(x.name)) as IndexField[];
};

export const clonify = <T>(input: object): T => {
  const str = JSON.stringify(input);
  const obj = JSON.parse(str);
  return obj as T;
};

export const isEqual = (
  a?: string,
  b?: string,
  ignoreCaseSensivity?: boolean
): boolean => {
  ignoreCaseSensivity = ignoreCaseSensivity ?? true;
  if (ignoreCaseSensivity) {
    a = a?.toLowerCase();
    b = b?.toLowerCase();
  }
  if (a === b) return true;
  return false;
};
