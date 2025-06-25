const parseFormatTime = (timeStr) => {
  const [hrs, mins, secs] = timeStr.split(":").map(Number);
  return hrs + mins / 60 + secs / 3600;
};

export default parseFormatTime;