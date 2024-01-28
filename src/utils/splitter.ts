export const descSplitter = (desc: string): string => {
  if (desc) {
    // NOTE: substring is used to shorten the description
    // const newString = arg_string.substring(0, 1111) + "...";
    const newString = desc;
    return newString;
  } else {
    return "";
  }
};
