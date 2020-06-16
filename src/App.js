import React from 'react';
import './App.css';
import {BrowserRouter as Router, NavLink, Switch, Route, Link} from 'react-router-dom';
import HamsterList from './components/HamsterList';
import AllGames from './components/AllGames';
import Stats from './components/Stats';
import NewHamster from './components/NewHamster';
import Battle from './components/Battle';
import Matchup from './components/Matchup';

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
          <h1>Welcome to Hamster Wars</h1>
          <h3>Here you will choose a winner between battling hamsters, based on cuteness or whatever you fancy. </h3>
          <h3>To start at battle, click on the tab above or on the button below.</h3>
          <h2>Let the wars begin!</h2>
          <Link to="/battle">Battle</Link>
        <Switch>
            <Route path="/stats"><Stats></Stats></Route>
            <Route path="/allHamsters"><HamsterList></HamsterList></Route>
            <Route path="/games"><AllGames></AllGames></Route>
            <Route path="/addHamster"><NewHamster/></Route> 
            <Route path="/battle/:id1/:id2"><Battle/></Route>
            <Route path="/battle"><Battle/></Route>
            <Route path="/matchup/:id1/:id2"><Matchup/></Route>
        </Switch>
      </main>
      <footer>

      </footer>
    </Router>
  );
}

export default App;
