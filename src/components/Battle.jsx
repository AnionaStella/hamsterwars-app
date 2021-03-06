import React, {useEffect, useState} from 'react';
import { useHistory, useParams } from "react-router-dom";
import PlayCard from './PlayCard';


const Battle = () => {

    const [hamster1, setHamster1] = useState(null); 
    const [hamster2, setHamster2] = useState(null);
    const [toggleNewGame, setToggleNewGame] = useState(false);

    let history = useHistory();
    let routeChange = () => {
        let path = `/matchup/${hamster1.id}/${hamster2.id}`;
        history.push(path);
      }
    
    let {id1, id2} = useParams();  

    useEffect(() => {
        async function fetchHamsters() {
            const url = '/api/hamsters/';
            let url1;
            let url2;
            if (id1 && id2) {
                url1 = url + id1;
                url2 = url + id2;
            } else {
                url1 = url + 'random';
                url2= url + 'random';
            }
            let resp = await fetch(url1);
            let json = await resp.json();
            setHamster1(json);
            resp = await fetch(url2);
            json = await resp.json();
            setHamster2(json);
        }
        fetchHamsters();
    },[toggleNewGame, id1, id2]);
    
    let battleHamster1;
    let battleHamster2;
    
    if (hamster1 !== null) {
        battleHamster1 = (<div onClick={() => saveGame(hamster1, hamster2, hamster1, routeChange)}>
                <PlayCard hamster={hamster1}/></div>)
    }
    if (hamster2 !== null) {
        battleHamster2 = (<div onClick={() => saveGame(hamster1, hamster2, hamster2, routeChange)}>
                <PlayCard hamster={hamster2}/></div>)
    }
    return (
        <div className="Battle">
            <h1 className="battle-h1">HamsterWars!</h1>
            <p className="battle-p">Click on the hamster you think should win!</p>
            <p className="battle-p">If you can't decide, start a new game.</p>
            <div className="Play">
                {battleHamster1}
                <h1 className="battle-h1">VS</h1>
                {battleHamster2}
            </div>
            <button onClick={() => createNewGame(setToggleNewGame, toggleNewGame)}>New battle</button>
            <br/>
        </div>
    )
}
const createNewGame = (setToggleNewGame, toggleNewGame) => {
    setToggleNewGame(!toggleNewGame);
}

const saveGame = async (hamster1, hamster2, winningHamster, routeChange) => {

    let game = {
        contestants:[hamster1,hamster2],
        winner: winningHamster
    }
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(game)
    };
    const resp = await fetch('/api/games', requestOptions);
    await resp.json();
    routeChange();   
               
}

export default Battle;