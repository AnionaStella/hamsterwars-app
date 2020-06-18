import React from 'react';
import './App.css';
import {BrowserRouter as Router, NavLink, Switch, Route} from 'react-router-dom';
import HamsterList from './components/HamsterList';
import AllGames from './components/AllGames';
import Stats from './components/Stats';
import NewHamster from './components/NewHamster';
import Battle from './components/Battle';
import Matchup from './components/Matchup';
import Start from './components/Start';

function App() {

  return (
    <Router>
      <header className="App-header">
        <NavLink to="/"><h1>Hamster Wars</h1></NavLink>
        <nav>
            <NavLink to="/battle">Battle</NavLink>
            <NavLink to="/stats">Stats</NavLink>
            <NavLink to="/upload">Add new hamster</NavLink>
            <NavLink to="/allHamsters">All hamsters</NavLink>
            <NavLink to="/games">All games</NavLink>
        </nav> 
      </header>
      <main>
        <Switch>
            <Route path="/stats"><Stats></Stats></Route>
            <Route path="/allHamsters"><HamsterList></HamsterList></Route>
            <Route path="/games"><AllGames></AllGames></Route>
            <Route path="/upload"><NewHamster/></Route> 
            <Route path="/battle/:id1/:id2"><Battle/></Route>
            <Route path="/battle"><Battle/></Route>
            <Route path="/matchup/:id1/:id2"><Matchup/></Route>
            <Route path="/"><Start/></Route>
        </Switch>
      </main>
      <footer>

      </footer>
    </Router>
  );
}

export default App;
