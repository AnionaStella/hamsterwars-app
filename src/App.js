import React from 'react';
import './App.css';
import {BrowserRouter as Router, NavLink, Switch, Route} from 'react-router-dom';
import HamsterList from './components/HamsterList';
import AllGames from './components/AllGames';
import Stats from './components/Stats';
import NewHamster from './components/NewHamster';
import Battle from './components/Battle';

function App() {
  
    // const [param, setParam] = useState('');

  return (
    <Router>
      <header className="App-header">
        <h1>Hamster Wars</h1>
        <nav>
            <NavLink to="/battle">Battle</NavLink>
            <NavLink to="/stats">Stats</NavLink>
            <NavLink to="/addHamster">Add new hamster</NavLink>
            <NavLink to="/allHamsters">All hamsters</NavLink>
            <NavLink to="/games">All games</NavLink>
        </nav> 
      </header>
      <main>
        <Switch>
            <Route path="/stats"><Stats></Stats></Route>
            <Route path="/allHamsters"><HamsterList></HamsterList></Route>
            <Route path="/games"><AllGames></AllGames></Route>
            <Route path="/addHamster"><NewHamster/></Route> 
            <Route path="/battle/:id1/:id2"><Battle/></Route>
            <Route path="/battle"><Battle/></Route>
        </Switch>
      </main>
      <footer>

      </footer>
    </Router>
  );
}

export default App;
