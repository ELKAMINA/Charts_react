/* eslint-disable no-plusplus */

/* Formatter les données pour l'affichage de la légende */
function getMaxValue(data) {
  let max = 0;
  data.forEach((datum) => {
    Object.keys(datum).forEach((key) => {
      if (key !== 'date' && key !== 'month') {
        if (datum[key] > max) {
          max = datum[key];
        }
      }
    });
  });
  return max;
}

function generateTickValues(maxValue) {
  const tickCount = 10;
  const interval = Math.ceil(maxValue / tickCount);
  const tickValues = [];
  for (let i = 0; i <= tickCount; i++) {
    tickValues.push(i * interval);
  }
  return tickValues;
}

function formatYaxis(value) {
  // console.log('value en KwH', value);
  if (value === 0) return '0 Wh';
  if (value < 1000000) return `${value / 1000} kWh`;
  return `${value / 1000000} MWh`;
}

export { getMaxValue, generateTickValues, formatYaxis };
