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
             let hour = padZero(date.getHours());
             let minute = padZero(date.getMinutes());
             let second = padZero(date.getSeconds()); 
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
function padZero(number) {

    if(number < 10){
        return '0' + number
    }
    else{
        return number
    }

}
export default AllGames;