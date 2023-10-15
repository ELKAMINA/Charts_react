/* eslint-disable no-unused-vars */
/* eslint-disable no-case-declarations */
/* eslint-disable default-case */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
// import { useTheme } from '@mui/material/styles';
import { ResponsiveBar } from '@nivo/bar';
import { setRef } from '@mui/material';
import PeriodFilter from './Filter';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import transformingData from '../utils/datatransformation';
import { fetchEnergy, selectEnergy } from '../redux/Projects/projectSlice';
import agregation from '../utils/dataAgregBymonth';
import { formatYaxis, generateTickValues, getMaxValue } from '../utils/barChartAxis';
// import mockBarData from '../test';

function BarChart() {
  const dispatch = useAppDispatch();
  const [change, setChange] = React.useState(0);
  const [transformedData, setTransformedData] = React.useState([]);
  const [keys, setKeys] = React.useState([]);
  const path = window.location.pathname;
  const uuid = path.split('/')[2];

  React.useEffect(() => {
    dispatch(fetchEnergy(uuid));
  }, [dispatch]);

  const rawData = useAppSelector(selectEnergy);
  React.useEffect(() => {
    const getData = async () => {
      try {
        console.log('rawdAta ICIIII ', rawData);
        const result = transformingData(rawData);
        setTransformedData(result);
        if (result[0] && result[0].labels) {
          const k = result[0].labels.map((e) => e.label);
          setKeys(k);
        }
      } catch (e) {
        console.error(e);
      }
    };

    getData();
  }, []);

  const filteredperiod = React.useRef([]);
  // eslint-disable-next-line no-unused-vars
  let maxDatavAlue;
  let getTickValues;
  const [choosenPeriod, setChoosenPeriod] = React.useState({
    range: '',
    from: '',
    to: '',
    month: '',
    day: '',
    year: '',
  });
  React.useEffect(() => {
    switch (choosenPeriod.range) {
      case 'Day':
        const formattedDate = `${choosenPeriod.year}-${choosenPeriod.month}-${choosenPeriod.day}`;
        filteredperiod.current = transformedData.filter((el) => el.date === formattedDate);
        setChange((prevChange) => prevChange + 1);
        break;
      case 'MonthDaily':
        filteredperiod.current = transformedData.filter((el) => {
          const year = el.date.split('-')[0];
          const month = el.date.split('-')[1];
          return (year === choosenPeriod.year && month === choosenPeriod.month);
        });
        setChange((prevChange) => prevChange + 1);
        break;
      case 'PersonalisedDaily':
        const fromDate = new Date(choosenPeriod.from);
        const toDate = new Date(choosenPeriod.to);
        filteredperiod.current = transformedData.filter((item) => {
          const itemDate = new Date(item.date);
          return itemDate >= fromDate && itemDate <= toDate;
        });
        setChange((prevChange) => prevChange + 1);
        break;
      case 'YearMonthly':
        filteredperiod.current = agregation(transformedData, choosenPeriod.year);
        setChange((prevChange) => prevChange + 1);
        break;
    }
    maxDatavAlue = getMaxValue(filteredperiod.current);
    getTickValues = generateTickValues(maxDatavAlue);
  }, [choosenPeriod]);

  return (
    <>
      <PeriodFilter choosenPeriod={choosenPeriod} setChoosenPeriod={setChoosenPeriod} />
      <ResponsiveBar
        data={filteredperiod.current}
        keys={keys}
        indexBy={choosenPeriod.range !== 'YearMonthly' ? 'date' : 'month'}
        margin={{
          top: 30, right: 130, bottom: 50, left: 150,
        }}
        padding={0.4}
        innerPadding={1}
        maxValue={maxDatavAlue}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: false }}
        valueFormat=" >-"
        colors={{ scheme: 'yellow_green' }}
        defs={[
          {
            id: 'dots',
            type: 'patternDots',
            background: 'inherit',
            color: '#38bcb2',
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: 'lines',
            type: 'patternLines',
            background: 'inherit',
            color: '#eed312',
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        borderColor={{
          from: 'color',
          modifiers: [
            [
              'darker',
              '1.6',
            ],
          ],
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 40,
          legend: 'Time period',
          legendPosition: 'middle',
          legendOffset: 46,
        }}
        axisLeft={{
          tickSize: 7,
          tickPadding: 7,
          tickRotation: 10,
          legend: 'Enegy',
          legendPosition: 'middle',
          legendOffset: -82,
          tickValues: getTickValues,
          format: formatYaxis,
        }}
        enableGridX
        enableLabel={false}
        labelSkipWidth={12}
        labelSkipHeight={11}
        labelTextColor={{
          from: 'color',
          modifiers: [
            [
              'darker',
              1.6,
            ],
          ],
        }}
        legends={[
          {
            dataFrom: 'keys',
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 200,
            translateY: -30,
            itemsSpacing: 2,
            itemWidth: 150,
            itemHeight: 20,
            itemDirection: 'left-to-right',
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: 'hover',
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        animate={false}
        role="application"
        ariaLabel="Nivo bar chart"
        barAriaLabel={(e) => `${e.id}: ${e.formattedValue} in country: ${e.indexValue}`}
      />

    </>
  );
}

export default BarChart;
