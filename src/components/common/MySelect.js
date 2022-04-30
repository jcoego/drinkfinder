import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

const MySelect = ({labelId, labelName, value, onChange, items,...props })=>{
    return (
    <>
        <InputLabel id={labelId}>{labelName}</InputLabel>
        <Select
        labelId={labelId}
        value={value}
        onChange={data => onChange(data)}
        label={labelName}
        >
          {
            items && items.map(item => (
                <MenuItem key={item.value} value={item.value}>{item.name}</MenuItem>
            ))
          }
        </Select>
    </>
    )
}

export default MySelect;