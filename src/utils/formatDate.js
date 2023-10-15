import { format, parseISO } from 'date-fns';

const getDateFromTimeStamp = (timestamp) => {
  const date = new Date(timestamp);

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;

  return (formattedDate);
};

function ChangingFormatDate(dateString) {
  const date = parseISO(dateString);
  return format(date, 'd/M');
}

export { getDateFromTimeStamp, ChangingFormatDate };
