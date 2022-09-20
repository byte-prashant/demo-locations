import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const Requirements = (props) => {
  let requirements = props.requirements
  const [req, setReq] = React.useState('');
  let setUserRequirement = props.setUserRequirement

  const handleChange = (event: SelectChangeEvent) => {
    setUserRequirement(event.target.value);
    setReq(event.target.value);
    console.log(requirements);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 80 }}>
        <InputLabel id="demo-simple-select-autowidth-label">Requirements</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={req}
          onChange={handleChange}
          autoWidth
          label="Requirements"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {requirements.map(item=><MenuItem value={item.id}>{item.name}</MenuItem>) }
          
        </Select>
      </FormControl>
    </div>
  );
}

export  {Requirements};