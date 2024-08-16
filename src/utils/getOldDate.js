export const getOldDate = (daysEarlier, fromDate = new Date()) => {
  // Create a new date object from the given date or today's date
  let date = new Date(fromDate);

  // Subtract the specified number of days
  date.setDate(date.getDate() - daysEarlier);

  // Format the date as 'YYYY-MM-DD'
  let year = date.getFullYear();
  let month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based, so add 1
  let day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
