import React, { useState, useEffect } from'react';
import ProfileCard from './ProfileCard'

// component som komma rendera olika beroende på inskick'

const MostBattled = () => {

    const url = '/api/stats/battled-most';
    const [hamster, setHamster] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const resp = await fetch(url);
            const json = await resp.json();
            setHamster(json);
        }
        fetchData();
    },[])
    
    return (
        <div>
            {(hamster !== null) ? <> <div><ProfileCard hamster={hamster}/></div> </> : ''}
        </div>
    )
}
export default MostBattled;