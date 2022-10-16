export const dateIncreaseDat = (date: string) => {
  let dateReturn = null;
  if (date === '') {
    dateReturn = '-';
  } else {
    const year = date.substring(0, 4);
    const month = date.substring(4, 6);
    const day = date.substring(6, 8);
    dateReturn = [year, month, day].join('-');
  }
  return dateReturn;
};

export const dateDiff = (date1: Date, date2: Date) => {
  const diffTime = Math.abs(date1.getTime() - date2.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};
