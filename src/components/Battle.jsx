import React, {useEffect, useState} from 'react';
import { useHistory, useParams, Link } from "react-router-dom";
import PlayCard from './PlayCard';


// import styled from 'styled-components';

const Battle = () => {

    const [hamster1, setHamster1] = useState(null); 
    const [hamster2, setHamster2] = useState(null);
    const [toggleNewGame, setToggleNewGame] = useState(false);
    const [winner, setWinner] = useState(null);
    // let card = '🐹';
    let history = useHistory();
    let routeChange = () => {
        let path = `/matchup/${hamster1.id}/${hamster2.id}`;
        console.log(path);
        history.push(path);
      }
    

    let {id1, id2} = useParams();  

    useEffect(() => {
        async function fetchHamsters() {
            const url = '/api/hamsters/';
            let url1;
            let url2;
            if (id1 && id2) {
                console.log('url id finns')
                url1 = url + id1;
                url2 = url + id2;
            } else {
                console.log('inga paramatrar')
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
        battleHamster1 = (<div className={winner !== null && winner.id === hamster1.id ? 'winner': 'left'} 
                onClick={() => saveGame(hamster1, hamster2, hamster1, winner, setWinner, setHamster1, setHamster2, routeChange)}>
                <PlayCard winner={winner !== null && winner.id === hamster1.id} hamster={hamster1}/></div>)
    }
    if (hamster2 !== null) {
        battleHamster2 = (<div className={winner !== null && winner.id === hamster2.id ? 'winner': 'right'} 
                onClick={() => saveGame(hamster1, hamster2, hamster2, winner, setWinner, setHamster1, setHamster2, routeChange)}>
                <PlayCard winner={winner !== null && winner.id === hamster2.id} hamster={hamster2}/></div>)
    }
    return(
        <div className="Start">
            <h1 className="fight" >HamsterWars!</h1>
            <div  className="Play">
                {battleHamster1}
                {battleHamster2}
            </div>
            <button onClick={() => createNewGame(setToggleNewGame, toggleNewGame, setWinner)}>New battle</button>
            <br/>
        </div>
    )
}
const createNewGame = (setToggleNewGame, toggleNewGame, setWinner) => {
    setToggleNewGame(!toggleNewGame);
    setWinner(null);
}

const saveGame = async (hamster1, hamster2, winningHamster, winner, setWinner, setHamster1, setHamster2, routeChange) => {

    if (winner === null) {
        let game = {
            contestants:[hamster1,hamster2],
            winner: winningHamster
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(game)
        };
        const resp = await fetch('/api/games', requestOptions)
        const json = await resp.json();
        console.log(json)
        setHamster1(json.contestants[0])
        setHamster2(json.contestants[1])
        setWinner(winningHamster)
        console.log('calling routechange')
        routeChange()   
    }            
}
export default Battle;