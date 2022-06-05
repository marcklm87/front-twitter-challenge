import './App.css';
import Routes from './routes'; 
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Routes />
      </Switch>
    </Router>
  );
}

export default App;
