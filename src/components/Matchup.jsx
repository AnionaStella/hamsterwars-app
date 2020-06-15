import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Matchup (){
    const url = '/api/games/last/';
    const [battle, setBattle] = useState('');
    const imgUrl = '/api/assets/'
    let {id1, id2} = useParams();  

    useEffect(() => {
        async function fetchData() {
            if(id1 && id2){
                const resp = await fetch(url + id1 + '/' + id2);
                const json = await resp.json();
                setBattle(json);
            }
        }
        fetchData();
    },[id1, id2]);

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