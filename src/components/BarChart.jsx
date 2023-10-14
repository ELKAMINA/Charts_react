/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
// import { useTheme } from '@mui/material/styles';
import { ResponsiveBar } from '@nivo/bar';
import { useAppSelector } from '../redux/hooks';
import PeriodFilter from './Filter';
import transformingData from '../utils/datatransformation';
import { selectEnergy } from '../redux/Projects/projectSlice';
// import mockBarData from '../test';

function BarChart() {
  const rawData = useAppSelector(selectEnergy);
  const transformedData = transformingData(rawData);
  console.log('data transformée par date ', transformedData);
  const keys = transformedData[0].labels.map((e) => e.label);
  const [choosenPeriod, setChoosenPeriod] = React.useState({
    range: '',
    fromTo: '',
    month: '',
    day: '',
    year: '',
  });

  React.useEffect(() => {
    console.log('choosen ', choosenPeriod);
  }, [choosenPeriod]);

  console.log('les keys ', keys);
  const test = transformedData.filter((el) => el.date < '2020-06-06');
  return (
    <>
      <PeriodFilter choosenPeriod={choosenPeriod} setChoosenPeriod={setChoosenPeriod} />
      <ResponsiveBar
        data={test}
        keys={transformedData[0].labels.map((el) => el.label)}
        indexBy="date"
        margin={{
          top: 50, right: 130, bottom: 50, left: 60,
        }}
        padding={0.4}
        innerPadding={1}
        maxValue={8000}
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
          tickRotation: 0,
          legend: 'country',
          legendPosition: 'middle',
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Enegy',
          legendPosition: 'middle',
          legendOffset: -40,
          tickValues: [0, 500, 1000, 1500, 2000, 2500, 3500, 4000, 4500,
            5000, 5500, 6000, 6500, 7000, 7500, 8000],
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
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 120,
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
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={(e) => `${e.id}: ${e.formattedValue} in country: ${e.indexValue}`}
      />

    </>
  );
}

export default BarChart;
