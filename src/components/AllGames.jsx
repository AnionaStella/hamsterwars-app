import React, { useState, useEffect } from 'react';


const AllGames = () =>{

    const allUrl = '/api/games'
    const [games, setGames] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const resp = await fetch(allUrl);
            const json = await resp.json();
            setGames(json);
        }
        fetchData();
    },[]);
  
    let allGames;
    if (games !== null) {
         allGames = games.map(game => {
             let date = new Date(game.timestamp);
             let hour = date.getHours();
             let minute = date.getMinutes();
             let second = date.getSeconds(); 
             let formattedDate = date.toLocaleDateString() + ' ' + hour +':' + minute + ':' + second;
             let key = game.timestamp._seconds + '_' + game.contestants[0].id + '_' + game.contestants[1].id;
             return (<div key={key}>
                <h1>game at {formattedDate}</h1>
                <p>{game.contestants[0].name} vs {game.contestants[1].name}</p>
                <p>{game.winner.name} won</p>
            </div>
           );
         }      
    )};

    return(
        <div>
            <h1>All games played: </h1>
            <ul>
                {allGames}
            </ul>
        </div>
    )
}
export default AllGames;