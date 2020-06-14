import React, { useState }from 'react';
import './App.css';
import {BrowserRouter as Router, NavLink, Switch, Route} from 'react-router-dom';
import Play from './components/Play';
import HamsterList from './components/HamsterList';
import MostBattled from './components/MostBattled';
import TopBottom from './components/TopBottom';
import AllGames from './components/AllGames';

function App() {
  
    const [param, setParam] = useState('');

  return (
    <Router>
      <header className="App-header">
        <h1>Hamster Wars</h1>
        <nav>
            <NavLink to="/">Play</NavLink>
            <NavLink to="/topHamsters" onClick={() => setParam('top')}>Best Hamsters</NavLink>
            <NavLink to="/bottomHamsters" onClick={() => setParam('bottom')}>Worst Hamsters</NavLink>
            <NavLink to="/mostBattled">Hamster veteran</NavLink>
            <NavLink to="/allHamsters">All hamsters</NavLink>
            <NavLink to="/games">All games</NavLink>
        </nav> 
      </header>
      <main>
        <Switch>
            <Route path="/allHamsters"><HamsterList></HamsterList></Route>
            <Route path="/games"><AllGames></AllGames></Route>
            <Route path="/topHamsters"><TopBottom param={param}></TopBottom></Route>
            <Route path="/bottomHamsters"><TopBottom param={param}></TopBottom></Route>
            <Route path="/mostBattled"><MostBattled></MostBattled></Route>
            <Route path="/"><Play/></Route> 
        </Switch>
      </main>
      <footer>

      </footer>
    </Router>
  );
}

export default App;
