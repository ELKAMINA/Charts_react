/* eslint-disable no-unused-vars */

import transformingData from './datatransformation';

/* Agréger les données par mois */
const agregation = (rawData, choosenYear) => {
  const aggregatedData = {};
  const filterOnYear = rawData.filter((e) => e.date.startsWith(choosenYear));
  filterOnYear.forEach((entry) => {
    const month = entry.date.split('-')[1];

    if (!aggregatedData[month]) {
      aggregatedData[month] = { month };
    }

    Object.keys(entry).forEach((key) => {
      if (key !== 'date') {
        if (!aggregatedData[month][key]) {
          aggregatedData[month][key] = 0;
        }
        aggregatedData[month][key] += entry[key];
      }
    });
  });

  return Object.values(aggregatedData);
};

export default agregation;
