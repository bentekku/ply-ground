export const descSplitter = (arg_string: string): string[] => {
  if (arg_string) {
    const stringArry = arg_string.split(".");
    const newString = stringArry.slice(0, 210);
    return newString;
  } else {
    return [];
  }
};
