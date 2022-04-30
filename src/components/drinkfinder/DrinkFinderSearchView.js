import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';

import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import MySelect from '../common/MySelect';
import { width } from '@mui/system';

const DrinkFinderSearchView = ({comboCategories=[], comboGlasses=[], comboIngredients=[], comboAlocholic=[],
                                category='', glass='', ingredient='', alcoholic='', name='',
                                onChange=()=>{}, onClick=()=>{},
                                ...props})=>{

  return  <Box 
            sx={{margin:'40px 40px 20px 40px', display: 'flex', 
            flexWrap:'wrap', justifyContent:'center' }}>

              <FormControlLabel
                value={alcoholic}
                control={<Checkbox onChange = {e => onChange({type:'alcoholic', value:e.target.value})} 
                          checked={alcoholic === 'Alcoholic'} />}
                label="Alcoholic"
                labelPlacement="start"
              />

              <TextField id="standard-basic"
                label="Name" variant="standard" 
                value={name}
                onChange={e => onChange({type:'name', value:e.target.value})} 
              />

              <MySelect 
                labelId={'ingredient-label-id'} 
                labelName={'Ingredient'}
                value={ingredient}
                onChange={(e)=>onChange({type:'ingredient', value: e.target.value})} 
                items ={comboIngredients}
              />

              <MySelect 
                  labelId={'category-label-id'} 
                  labelName={'Category'}
                  value={category}
                  onChange={(e)=>onChange({type:'category', value: e.target.value})} 
                  items ={comboCategories}
                />

               <MySelect 
                labelId={'glass-label-id'} 
                labelName={'Glass'}
                value={glass}
                onChange={(e)=>onChange({type:'glass', value: e.target.value})} 
                items ={comboGlasses}
              />


              <InputLabel id="glass-label-id">Glass</InputLabel>
              <Select
                labelId="glass-label-id"
                id="glass-id"
                value={''}
                onChange={()=>{}}
                label="Glass"
                sx={{width:'25%'}}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
              
              <div style = {{width: '100%'}}></div>

              <Button onClick={e => onClick({type:'search'})} variant="outlined" startIcon={<SearchIcon />}>
                Search
              </Button>
          </Box>
}

export default DrinkFinderSearchView;