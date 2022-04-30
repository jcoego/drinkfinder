import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const DrinkFinderResultsView = ({drinks, onClick=()=>{}, ...props })=>{
    let drinkWithIngredients=[]
    for(let drink of drinks){
        let arrIngredients=[]
        for(let key in drink){
            if(key.indexOf("strIngredient")!==-1 && drink[key]){
                arrIngredients.push(drink[key])
            }
        }
        drinkWithIngredients.push({...drink, _ingredients: arrIngredients})
    }

    return (
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Image</TableCell>
            <TableCell align="center">Description</TableCell>
            <TableCell align="left">Ingredients</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {drinkWithIngredients && drinkWithIngredients.map((drink) => (
            <TableRow
              key={drink.idDrink}
              sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': {
                cursor: 'pointer'
              } }}
              onClick={e => onClick(drink)}
            >
              <TableCell component="th" scope="row">
                <img src={drink.strDrinkThumb} width="100px" alt="Paris"/> 
              </TableCell>
              <TableCell align="left">
                <div style={{marginLeft: '5px', textAlign:'left'}}>
                    <strong>{drink.strDrink}</strong>
                    <div>{drink.strAlcoholic}</div>
                    <div>{drink.strCategory}</div>
                    <div>{drink.strGlass}</div>
                </div>
              </TableCell>
              <TableCell align="left">{drink._ingredients.join(', ')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )

    return <div>
        {
            drinkWithIngredients && drinkWithIngredients.map((drink)=>(
            <Box 
                sx={{display: 'flex', padding: '15px', margin: '3px',
                flexWrap:'wrap', justifyContent:'left', border:'1px solid grey' }}>

             <div><img src={drink.strDrinkThumb} width="100px" alt="Paris"/> </div>
             <div style={{marginLeft: '5px', textAlign:'left'}}>
                <strong> {drink.strDrink}</strong>
                <div>{drink.strAlcoholic}</div>
                <div>{drink.strCategory}</div>
                <div>{drink.strGlass}</div>
            </div>
            <div style={{marginLeft: '25px', textAlign:'left',
                wordWrap: 'break-word', border: '1px dashed grey',
                padding: '5px'
            }}>
                <div><u>Ingredients:</u></div>
                <ul>
                    {
                        drink._ingredients && drink._ingredients.map((ing)=>(
                            <li>{ing}</li>
                        ))
                    }
                    <li>INg</li>
                </ul>
               
            </div>
    
            </Box>
            ))
       
        }
    </div>
}

export default DrinkFinderResultsView;