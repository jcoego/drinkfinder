import './App.css';
import DrinkFinder from './pages/DrinkFinder';
import { Router, Link } from "@reach/router";
import CombosProvider from './components/providers/CombosProviders';
import { createTheme, ThemeProvider, styled, useTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary:{
      main: 'rgb(67,55,117)',
      contrastText:'#FFFFFF'
    },
    secondary:{
      main: '#FFBD35',
      contrastText:'#838080'
    }
  }
 
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CombosProvider>
          <Router>
            <DrinkFinder path='/' />
          </Router>
        </CombosProvider>
       </ThemeProvider>
    </div>
  );
}

export default App;
