const getPreviousMonth = () => {
  var date = new Date();
  var month = date.getMonth();
  var year = month === 1 ? date.getFullYear() - 1 : date.getFullYear();
  return new Date(year, month === 1 ? 12 : month - 1, 1);
};

export default getPreviousMonth;
