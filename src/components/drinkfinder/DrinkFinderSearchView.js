import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import MySelect from '../common/MySelect';

const DrinkFinderSearchView = ()=>{
  return  <Box 
            sx={{margin:'40px 40px 20px 40px', display: 'flex', 
            flexWrap:'wrap', justifyContent:'center' }}>

              <FormControlLabel
                value="start"
                control={<Checkbox />}
                label="Alcoholic"
                labelPlacement="start"
              />

              <TextField id="standard-basic" label="Name" variant="standard" />

              <MySelect 
                labelId={'ingredient-label-id'} 
                labelName={'Ingredient'}
                value={''}
                onChange={()=>{}} 
                items ={[{value:0,name:'Jose'}, {value:1, name:'Ric'}]}
              />

            <MySelect 
                labelId={'category-label-id'} 
                labelName={'Category'}
                value={''}
                onChange={()=>{}} 
                items ={[{value:0,name:'Jose'}, {value:1, name:'Ric'}]}
              />

               <MySelect 
                labelId={'glass-label-id'} 
                labelName={'Glass'}
                value={''}
                onChange={()=>{}} 
                items ={[{value:0,name:'Jose'}, {value:1, name:'Ric'}]}
              />

              <InputLabel id="glass-label-id">Glass</InputLabel>
              <Select
                labelId="glass-label-id"
                id="glass-id"
                value={''}
                onChange={()=>{}}
                label="Glass"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
          </Box>
}

export default DrinkFinderSearchView;