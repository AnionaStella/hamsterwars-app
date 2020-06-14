import React, { useState, useEffect } from 'react';


const AllGames = () =>{

    const totalUrl = 'http://localhost:3003/stats/total';
    const allUrl = 'http://localhost:3003/games'
    const [games, setGames] = useState(null);
    const [total, setTotal] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const resp = await fetch(allUrl);
            const json = await resp.json();
            setGames(json);
        }
        fetchData();
    },[]);
    useEffect(() => {
        async function fetchData() {
            const resp = await fetch(totalUrl);
            const json = await resp.json();
            setTotal(json);
        }
        fetchData();
    },[]);
  
    let allGames;
    if (games !== null) {
         allGames = games.map(game => {
             let date = new Date(game.timestamp).toLocaleDateString();
             let key = game.timestamp._seconds + '_' + game.contestants[0].id + '_' + game.contestants[1].id;
             return (<div key={key}>
                <h1>game at {date}</h1>
                <p>{game.contestants[0].name} vs {game.contestants[1].name}</p>
                <p>{game.winner.name} won</p>
            </div>
           );
         }      
    )};

    return(
        <div>
            {total !== null ? <> <h1>Total amount of games: {total.totalGames}</h1> </>: ''}
            <h1>All games played: </h1>
            <ul>
                {allGames}
            </ul>
        </div>
    )
}
export default AllGames;