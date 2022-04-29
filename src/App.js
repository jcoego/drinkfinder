import './App.css';
import DrinkFinder from './pages/DrinkFinder';
import { Router, Link } from "@reach/router";
import CombosProvider from './components/providers/CombosProviders';

function App() {
  return (
    <div className="App">
      <CombosProvider>
        <Router>
          <DrinkFinder path='/' />
        </Router>
       </CombosProvider>
    </div>
  );
}

export default App;
