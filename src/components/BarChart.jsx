/* eslint-disable no-unused-vars */
/* eslint-disable no-case-declarations */
/* eslint-disable default-case */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { setRef } from '@mui/material';
import {
  differenceInDays, eachWeekOfInterval, startOfToday, endOfToday, format,
} from 'date-fns';
import PeriodFilter from './Filter';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import transformingData from '../utils/datatransformation';
import { fetchEnergy, selectEnergy } from '../redux/Projects/projectSlice';
import agregation from '../utils/dataAgregBymonth';
import { formatYaxis, generateTickValues, getMaxValue } from '../utils/barChartAxis';
import { ChangingFormatDate } from '../utils/formatDate';

function BarChart() {
  /* Récupération de l'uuid du projet à partir de l'url  */
  const path = window.location.pathname;
  const uuid = path.split('/')[2];
  /* ******* */
  const dispatch = useAppDispatch();
  const [keys, setKeys] = React.useState([]);
  const [change, setChange] = React.useState(0);
  const [showChart, setShowChart] = React.useState(true);
  const [transformedData, setTransformedData] = React.useState([]);
  const filteredperiod = React.useRef([]);
  // eslint-disable-next-line no-unused-vars
  let maxDataValue;
  let getTickValues;
  const [choosenPeriod, setChoosenPeriod] = React.useState({
    range: '',
    from: '',
    to: '',
    month: '',
    day: '',
    year: '',
  });

  let bottomTickValues;

  /* Récupération des données du projet  */
  React.useEffect(() => {
    dispatch(fetchEnergy(uuid));
  }, [dispatch, uuid]);
  /* ******* */

  const rawData = useAppSelector(selectEnergy);

  /* Transformation et prépartion des données du projet pour la représnetation graphique */
  React.useEffect(() => {
    const getData = async () => {
      try {
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
    return () => {
      setKeys([]);
    };
  }, [rawData]);
  /* ******* */

  /* Re-render du graph et transfo des données selon Time period choisie par l'utilisateur */
  React.useEffect(() => {
    // console.log('transformed Data ', transformedData);
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
        const startDate = new Date(filteredperiod.current[0]?.date);
        const endDate = new Date(filteredperiod.current[filteredperiod.current.length - 1]?.date);
        const dateDifference = differenceInDays(endDate, startDate);
        if (dateDifference > 35) {
          setShowChart(false);
        } else {
          setShowChart(true);
        }
        setChange((prevChange) => prevChange + 1);
        break;
      case 'YearMonthly':
        filteredperiod.current = agregation(transformedData, choosenPeriod.year);
        setChange((prevChange) => prevChange + 1);
        break;
    }
    maxDataValue = getMaxValue(filteredperiod.current);
    getTickValues = generateTickValues(maxDataValue);
    // console.log('filtered ', filteredperiod.current);
  }, [choosenPeriod, showChart]);
  /* ******* */

  return (
    <>
      <PeriodFilter choosenPeriod={choosenPeriod} setChoosenPeriod={setChoosenPeriod} />
      {showChart && keys.length > 0 && filteredperiod.current.length > 0 && (
      <ResponsiveBar
        data={filteredperiod.current}
        keys={keys}
        indexBy={choosenPeriod.range !== 'YearMonthly' ? 'date' : 'month'}
        margin={{
          top: 30, right: 130, bottom: 50, left: 150,
        }}
        padding={0.4}
        innerPadding={1}
        maxValue={maxDataValue}
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
          tickRotation: 30,
          legend: 'Period',
          legendPosition: 'middle',
          legendOffset: 43,
          tickValues: bottomTickValues,
          // format: (value) => ChangingFormatDate(value, choosenPeriod),
          format: choosenPeriod.range !== 'YearMonthly' ? (value) => ChangingFormatDate(value, choosenPeriod) : '',
        }}
        axisLeft={{
          tickSize: 7,
          tickPadding: 7,
          tickRotation: 20,
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
            translateX: 100,
            translateY: -30,
            itemsSpacing: 0,
            itemDirection: 'right-to-left',
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 10,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
            effects: [
              {
                on: 'hover',
                style: {
                  itemBackground: 'rgba(0, 0, 0, .03)',
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

      )}
      {!showChart && (
        <div style={{ color: 'red', textAlign: 'center' }}>
          The time period is too large to display. Please select a smaller range( under 35 days)
        </div>
      )}

    </>
  );
}

export default BarChart;
