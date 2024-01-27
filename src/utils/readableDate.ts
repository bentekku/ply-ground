// NOTE: Converting `released` date of the game to a human readable format
const readableDate = (released: string): string => {
  if (released) {
    const releasedDate = new Date(released);
    const humanReadableDate = releasedDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    // console.log(humanReadableDate);
    return humanReadableDate;
  } else {
    return "N/A";
  }
};

export default readableDate;
