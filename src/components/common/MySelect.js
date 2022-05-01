import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

const defaultStyles= {
  width: '250px',
  margin: '10px',

}

const MySelect = ({labelId, labelName, value, onChange, items,...props })=>{
    return (
    <div>
        <InputLabel id={labelId}>{labelName}</InputLabel>
        <Select
          labelId={labelId}
          value={value}
          onChange={data => onChange(data)}
          label={labelName}
          sx={defaultStyles}
        >
          {
            items && items.map(item => (
                <MenuItem key={item.value} value={item.value}>{item.name}</MenuItem>
            ))
          }
        </Select>
    </div>
    )
}

export default MySelect;