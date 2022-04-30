import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';


const DrinkFinderModalDetails = ({open=false, drink={}, handleClose=()=>{}, ...props})=>{
  console.log('open,drink', open, drink)
   return (<Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="dialog-title-id">
          {drink.strDrink}
        </DialogTitle>
        <DialogContent>
          <img src={drink.strDrinkThumb} width="300px" /> 
          <hr/>
          <DialogContentText>
             <strong>Ingredients:</strong>
             {drink._ingredients && drink._ingredients.length > 0 ? drink._ingredients.join(', ') : ''}
          </DialogContentText>
          <hr/>
          <DialogContentText>
             <strong>Ingredients Instructions: </strong>
             {drink.strInstructions}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
    </Dialog>)

}


export default DrinkFinderModalDetails;