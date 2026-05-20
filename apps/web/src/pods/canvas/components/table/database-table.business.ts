export const calculateColumNameWidth = (
  widths: number[],
  tableSize: number
): number => {
  const totalWidth = widths.reduce((prev, curr) => prev + curr, 0);
  return tableSize - totalWidth;
};
