function getTimestampInSeconds(date: Date) {
  return Math.floor(date.getTime() / 1000);
}

export default getTimestampInSeconds;
