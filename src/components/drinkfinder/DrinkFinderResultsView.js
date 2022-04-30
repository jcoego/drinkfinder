import Box from '@mui/material/Box';

const DrinkFinderResultsView = ({drinks,...props })=>{
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