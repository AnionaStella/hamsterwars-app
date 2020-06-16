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
             return (
                <tr key={key}>
                    <td>
                        {formattedDate}
                    </td>
                    <td>
                        {game.contestants[0].name} vs {game.contestants[1].name}
                    </td>
                    <td>
                        {game.winner.name}
                    </td>
                </tr>
           );
         }      
    )};

    return(
        <div>
            <h1>All games played: </h1>
            <table>
                <thead>
                    <th>Date</th>
                    <th>Contestants</th>
                    <th>Winner</th>
                </thead>
                {allGames}
            </table>
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