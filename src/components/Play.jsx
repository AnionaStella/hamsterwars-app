import React, {useEffect, useState} from 'react';
import PlayCard from './PlayCard';
// import styled from 'styled-components';

const Play = () => {
    const url = '/api/hamsters/random';
    const [hamster1, setHamster1] = useState(null); 
    const [hamster2, setHamster2] = useState(null);
    const [toggleNewGame, setToggleNewGame] = useState(false);
    const [winner, setWinner] = useState(null);
    // let card = '🐹';

    useEffect(() => {
        async function fetchHamsters() {
            let resp = await fetch(url);
            let json = await resp.json();
            setHamster1(json);
            resp = await fetch(url);
            json = await resp.json();
            setHamster2(json);
        }
        fetchHamsters();
    },[toggleNewGame]);
    
    let randomHamster1;
    let randomHamster2;
    
    if (hamster1 !== null) {
        randomHamster1 = (<div className={winner !== null && winner.id === hamster1.id ? 'winner': 'left'} 
                onClick={() => saveGame(hamster1, hamster2, hamster1, winner, setWinner, setHamster1, setHamster2)}>
                <PlayCard winner={winner !== null && winner.id === hamster1.id} hamster={hamster1}/></div>)
    }
    if (hamster2 !== null) {
        randomHamster2 = (<div className={winner !== null && winner.id === hamster2.id ? 'winner': 'right'} 
                onClick={() => saveGame(hamster1, hamster2, hamster2, winner, setWinner, setHamster1, setHamster2)}>
                <PlayCard winner={winner !== null && winner.id === hamster2.id} hamster={hamster2}/></div>)
    }
    return(
        <div className="Start">
            <h1 className="fight" >HamsterWars!</h1>
            <div  className="Play">
            {randomHamster1}
            {randomHamster2}
            </div>
            <button onClick={() => createNewGame(setToggleNewGame, toggleNewGame, setWinner)}>New game</button>
        </div>
    )
}
const createNewGame = (setToggleNewGame, toggleNewGame, setWinner) => {
    setToggleNewGame(!toggleNewGame);
    setWinner(null);
}

const saveGame = (hamster1, hamster2, winningHamster, winner, setWinner, setHamster1, setHamster2) => {

    if (winner === null) {
        let game = {
            contestants : [hamster1, hamster2],
            winner: winningHamster
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'authorization':'abc1234' },
            body: JSON.stringify(game)
        };
        fetch('/api/games', requestOptions)
        .then(response => response.json())
        .then(data => {
            setHamster1(data.contestants[0])
            setHamster2(data.contestants[1])
            setWinner(winningHamster) 
        });  
    }            
}
export default Play;