/* eslint-disable array-callback-return */
import getDateFromTimeStamp from './formatDate';
import sortByDateDescending from './global';
import convertFromWattToKiloWatt from './wattToKilowatt';

const transformingData = (rawData) => {
  /* Première transformation pour récupérer le bon format de date */
  const intermediateResult = rawData.map((it) => ({
    label: it.label,
    consumptionPerDate: it.data.map(([timestamp, consumption]) => ({
      date: getDateFromTimeStamp(timestamp),
      energy: convertFromWattToKiloWatt(consumption),
    })),
  }));

  const finalResult = intermediateResult.reduce((result, item) => {
    item.consumptionPerDate.forEach((data) => {
      const { date } = data;
      if (!result.some((r) => r.date === date)) {
        result.push({ date, labels: [] });
      }
      const matchingEntry = result.find((r) => r.date === date);
      matchingEntry.labels.push({
        label: item.label,
        energy: data.energy,
      });
      matchingEntry[item.label] = data.energy;
    });
    result.sort(sortByDateDescending);
    return result;
  }, []);

  return finalResult;
};

export default transformingData;
