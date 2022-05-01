import './App.css';
import DrinkFinder from './pages/DrinkFinder';
import { Router} from "@reach/router";
import CombosProvider from './components/providers/CombosProviders';
import { createTheme, ThemeProvider} from '@mui/material/styles';
import {getStyles} from './utils/config'

const theme = createTheme(getStyles());

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
