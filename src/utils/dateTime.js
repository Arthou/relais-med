const firstDayPreviousMonth = () => {
  var date = new Date();
  var month = date.getMonth();
  var year = month === 1 ? date.getFullYear() - 1 : date.getFullYear();
  return new Date(year, month === 1 ? 11 : month - 1, 1);
};

//const lastDayPreviousMonth

export const lastDayPreviousMonth = () => {
  var date = new Date(); // current date
  date.setDate(1); // going to 1st of the month
  date.setHours(-1); // going to last hour before this date even started.
  return date;
};

export const startHour = () => {
  return new Date(2022, 1, 1, 1, 0, 0);
};

export const endHour = () => {
  return new Date(2022, 1, 1, 0, 0, 0);
};

export default firstDayPreviousMonth;
