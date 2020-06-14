import React, { useState, useEffect } from'react';
import ProfileCard from './ProfileCard'

// component som komma rendera olika beroende på inskick'

const TopBottom = ({ param }) => {

    const url = '/api/charts/';
    const [data, setData] = useState(null);  

    useEffect(() => {
        async function fetchData() {
            const resp = await fetch(url+param);
            const json = await resp.json();
            setData(json);
        }
        fetchData();
    },[param]);

    let allHamsters;
    if (data !== null) {
         allHamsters = data.map(hamster => {
            return (
            <li key={hamster.id} ><ProfileCard hamster={hamster}/></li>
            );
         }
    )}

    return (
        <div>
            <ol>
                {allHamsters}
            </ol>
        </div> 
    )
}
export default TopBottom;