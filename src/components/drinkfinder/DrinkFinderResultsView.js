import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


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
      <div style={{padding:'45px'}}>
        <Table sx={{  }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Image</TableCell>
              <TableCell align="left">Description</TableCell>
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
      </div>
    )

}

export default DrinkFinderResultsView;