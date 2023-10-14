/* eslint-disable react/prop-types */
import React from 'react';
// import dayjs from 'dayjs';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

function PeriodFilter({ choosenPeriod, setChoosenPeriod }) {
  const [timePeriod, setTimePeriod] = React.useState('');
  // eslint-disable-next-line no-unused-vars
  const [Dmonthyear, setDmonthYear] = React.useState('');
  // eslint-disable-next-line no-unused-vars
  const [Wyear, setWear] = React.useState([]);
  //   const [w_monthYear, setWMonthYear] = React.useState('');
  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setTimePeriod(selectedValue);
    setChoosenPeriod({ ...choosenPeriod, range: selectedValue });
  };

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
            <MenuItem value="Weekly">Weekly</MenuItem>
            <MenuItem value="Monthly">Monthly</MenuItem>
          </Select>
        </FormControl>
      </Box>
      { timePeriod === 'Daily' && (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']}>
          <DatePicker
            label={'"month" and "year"'}
            views={['month', 'year']}
            value={Dmonthyear}
            onChange={(date) => setChoosenPeriod({
              ...choosenPeriod,
              month: date.month,
              year: date.year,
            })}
          />
        </DemoContainer>
      </LocalizationProvider>
      )}
      { timePeriod === 'Weekly' && (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DemoContainer components={['DateRangePicker']}>
            <DemoItem component="DateRangePicker">
              <DateRangePicker
                value={[new Date(), new Date()]}
                onChange={(newValue) => setChoosenPeriod({ ...choosenPeriod, fromTo: newValue })}
              />
            </DemoItem>
          </DemoContainer>
        </LocalizationProvider>
      )}
      { timePeriod === 'Monthly' && (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker']}>
            <DatePicker
              label={'"year"'}
              views={['year']}
              value={Dmonthyear}
              onChange={(date) => setChoosenPeriod({ ...choosenPeriod, year: date })}
            />
          </DemoContainer>
        </LocalizationProvider>
      )}

    </>
  );
}

export default PeriodFilter;
