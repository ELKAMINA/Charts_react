/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
// import dayjs from 'dayjs';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import 'react-date-range/dist/styles.css';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { DateRangePicker } from 'react-date-range';
import FormControl from '@mui/material/FormControl';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Typography } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

function PeriodFilter({ choosenPeriod, setChoosenPeriod }) {
  const [timePeriod, setTimePeriod] = React.useState('');
  // eslint-disable-next-line no-unused-vars
  const [daily, setDmonthYear] = React.useState('');
  const [personalised, setPersonalised] = React.useState('');
  const [monthly, setMonthly] = React.useState('');
  // eslint-disable-next-line no-unused-vars
  const [yearly, setYear] = React.useState([]);
  const [value, setValue] = React.useState(
    [null, null],
  );
  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setTimePeriod(selectedValue);
    setChoosenPeriod({ ...choosenPeriod, range: selectedValue });
  };

  const handleSelect = (ranges) => {
    const { selection } = ranges;
    console.log('range date ', selection);
  };

  React.useEffect(() => {

  }, [timePeriod, daily, monthly, yearly, personalised]);

  return (
    <>
      <Box sx={{ minWidth: '30vw' }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label" style={{ width: 'auto' }}>Time period</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={timePeriod}
            label="Period"
            onChange={handleChange}
          >
            <MenuItem value="Daily">Daily</MenuItem>
            <MenuItem value="Personalised">Personalised</MenuItem>
            <MenuItem value="Monthly">Monthly</MenuItem>
          </Select>
        </FormControl>
      </Box>
      { timePeriod === 'Daily' && (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']}>
          <DatePicker
            label={'"month", "day", "year"'}
            views={['month', 'day', 'year']}
            value={daily}
            onChange={(date) => setChoosenPeriod({
              ...choosenPeriod,
              day: String(date.$d.getDate()).padStart(2, '0'),
              month: String(date.$d.getMonth() + 1).padStart(2, '0'),
              year: date.$d.getFullYear(),
            })}
          />
        </DemoContainer>
      </LocalizationProvider>
      )}
      { timePeriod === 'Personalised' && (
        <>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker
                label={'"day" and "month" and "year"'}
                views={['day', 'month', 'year']}
                value={personalised}
                onChange={(date) => setChoosenPeriod({
                  ...choosenPeriod,
                  from: `${String(date.$d.getMonth() + 1).padStart(2, '0')}-${String(date.$d.getDate()).padStart(2, '0')}-${date.$d.getFullYear()}`,
                })}
              />
            </DemoContainer>
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker
                label={'"day" and "month" and "year"'}
                views={['day', 'month', 'year']}
                value={personalised}
                onChange={(date) => setChoosenPeriod({
                  ...choosenPeriod,
                  to: `${String(date.$d.getMonth() + 1).padStart(2, '0')}-${String(date.$d.getDate()).padStart(2, '0')}-${date.$d.getFullYear()}`,
                })}
              />
            </DemoContainer>
          </LocalizationProvider>
        </>
      )}
      { timePeriod === 'Monthly' && (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker']}>
            <DatePicker
              label={'"month" and "year"'}
              views={['month', 'year']}
              value={monthly}
              onChange={(date) => setChoosenPeriod({
                ...choosenPeriod,
                month: String(date.$d.getMonth() + 1).padStart(2, '0'),
                year: String(date.$d.getFullYear()),
              })}
            />
          </DemoContainer>
        </LocalizationProvider>
      )}
      { timePeriod === 'Yearly' && (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker']}>
            <DatePicker
              label={'"year"'}
              views={['year']}
              value={yearly}
              onChange={(date) => setChoosenPeriod({
                ...choosenPeriod,
                year: date.year,
              })}
            />
          </DemoContainer>
        </LocalizationProvider>
      )}

    </>
  );
}

export default PeriodFilter;
