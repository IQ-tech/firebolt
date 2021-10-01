const dateFormat = (value = '') => {
  if (value.length < 9) {
    return false;
  }

  let yearI, monthI, dayI, separator;
  if (/-/gi.test(value)) {
    yearI = 0;
    monthI = 1;
    dayI = 2;
    separator = '-';
  } else if (/\//gi.test(value)) {
    yearI = 2;
    monthI = 1;
    dayI = 0;
    separator = '/';
  } else {
    return false;
  }

  const date = value.split(separator),
    year = date[yearI],
    regularMonth = parseInt(date[monthI], 10),
    month = regularMonth > 9 ? regularMonth : `0${regularMonth}`,
    day =
      parseInt(date[dayI], 10) < 10
        ? '0' + parseInt(date[dayI], 10)
        : date[dayI];

  return `${day}/${month}/${year}`;
};

export default dateFormat;
