import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';


const DrinkFinderAppBar = ({title}) =>{

    return <AppBar position="static">
            <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{height:'50px'}}
            >
                {title}
            </Typography>
    </AppBar>
}

export default DrinkFinderAppBar;