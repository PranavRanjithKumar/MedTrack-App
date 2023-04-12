const formatDate = (date) => {
  const datePadFilled = `${date.getDate()}`.padStart(2, '0');
  const monthPadFilled = `${date.getMonth() + 1}`.padStart(2, '0');
  const year = `${date.getFullYear()}`;
  return `${datePadFilled}-${monthPadFilled}-${year}`;
};

export default formatDate;
