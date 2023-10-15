/* eslint-disable no-unused-vars */

import transformingData from './datatransformation';

const agregation = (rawData, choosenYear) => {
  const aggregatedData = {};
  console.log('rawData ', rawData);
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

// const filterOnYear = rawData
//   .filter((el) => el.date.startsWith(choosenYear))
//   .reduce((agg, element) => {
//     const { date, ...dataWithoutDate } = element;
//     const month = element.date.split('-')[1];
//     if (!dataPerMonth[month]) {
//       dataPerMonth[month] = { month, ...dataWithoutDate };
//     } else {
//       Object.keys(dataWithoutDate).forEach((label) => {
//         dataPerMonth[month][label] = (dataPerMonth[month][label] || 0) + dataWithoutDate[label];
//       });
//     }
//     return dataPerMonth;
//   }, {});
// const aggregatedArray = Object.values(filterOnYear);
// return aggregatedArray;
