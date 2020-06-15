import React, { useState, useEffect } from 'react';

function Matchup ({hamster1, hamster2}){
    const url = '/api/games/last/';
    const [battle, setBattle] = useState('');
    const imgUrl = '/api/assets/'

    useEffect(() => {
        async function fetchData() {
            if(hamster1 && hamster2){
                const resp = await fetch(url + hamster1.id + '/' + hamster2.id);
                const json = await resp.json();
                setBattle(json);
            }
        }
        fetchData();
    },[hamster1, hamster2]);

    let bataille;
    if(battle !== ''){
      bataille = ( <> <h1>You have arrived at Matchup.</h1>
            <h1>Results of the game: {battle.contestant1.name} vs. {battle.contestant2.name}</h1>
            <h1>Winner is {battle.winner.name}</h1>
            <img src={imgUrl + battle.winner.imgName} alt="profile-pic" className="profile-img"/>
            <p>{battle.winner.name} loves to {battle.winner.loves}</p>
            <p>{battle.winner.name}s favorite food is {battle.winner.favFood}, so make sure to put some more in the bowl for dinner. </p> </>
            )
         }

    return(
        <div>
           {bataille}
        </div>
    )


}
export default Matchup;