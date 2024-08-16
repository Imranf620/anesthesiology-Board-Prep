import { getOldDate } from "./getOldDate";

export const sortDataByDates = (data, lastDays, extractDate) => {
  return data.filter((itm) => {
    let date;
    if (lastDays === 7) {
      date = getOldDate(lastDays);
    } else if (lastDays === 30) {
      date = getOldDate(lastDays);
    } else if (lastDays === 90) {
      date = getOldDate(lastDays);
    }
    // Get date from file url
    const fileDate = extractDate ? extractDate(itm) : itm;
    // Compare it to the filtered date
    const d1 = new Date(date);
    const d2 = new Date(fileDate);
    return d1.getTime() < d2.getTime();
  });
};
