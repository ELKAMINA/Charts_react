import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect(dataFormat, cb, obj) {
  const [type, setType] = React.useState('');

  const handleChange = (event) => {
    setType(event.target.value);
    cb(event.target.value);
    switch()
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{type}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={type}
          label={dataFormat}
          onChange={handleChange}
        >
          <MenuItem value={10}>Daily</MenuItem>
          <MenuItem value={20}>Weekly</MenuItem>
          <MenuItem value={30}>Monthly</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
