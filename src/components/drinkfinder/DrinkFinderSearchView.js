import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

import MySelect from '../common/MySelect';


const DrinkFinderSearchView = ({comboCategories=[], comboGlasses=[], comboIngredients=[], comboAlocholic=[],
                                category='', glass='', ingredient='', alcoholic='', name='',
                                onChange=()=>{}, onClick=()=>{},
                                ...props})=>{

  return  <Box 
            sx={{margin:'10px 40px 20px 40px', display: 'flex', 
            flexWrap:'wrap', justifyContent:'center',
            //border: '1px solid grey',
            backgroundColor: 'rgb(228,228,228)',
            borderRadius: '7px',
            padding:'10px'
             }}>

              <FormControlLabel
                value={alcoholic}
                sx={{marginRight:'7px'}}
                control={<Checkbox onChange = {e => onChange({type:'alcoholic', value:e.target.value})} 
                          checked={alcoholic === 'Alcoholic'} />}
                label="Alcoholic"
                labelPlacement="start"
              />

              <TextField id="standard-basic"
                label="Name" 
                variant="outlined" 
                value={name}
                sx={{marginTop:'32px'}}
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
              
              <div style = {{width: '100%'}}></div>

              <Button onClick={e => onClick({type:'search'})} variant="contained" startIcon={<SearchIcon />}>
                Search
              </Button>
          </Box>
}

export default DrinkFinderSearchView;