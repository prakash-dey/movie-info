
import './App.css';
import NavBar from './components/navbar/NavBar';

import {
  BrowserRouter as Router,
} from "react-router-dom";
import Routing from './config/Routing';



function App() {
  return (
    <div className="App">
      <Router>
      <NavBar/>
      <Routing/>
      </Router>      
    </div>
  );
}

export default App;
