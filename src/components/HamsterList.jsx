import React, { useEffect, useState } from 'react';
import ProfileCard from './ProfileCard';

const HamsterList = () => {

    const url = '/api/hamsters';
    const [data, setData] = useState(null);  

    useEffect(() => {
        async function fetchData() {
            const resp = await fetch(url);
            const json = await resp.json();
            setData(json);
        }
        fetchData();
    },[]);

    let allHamsters;
    if (data !== null) {
         allHamsters = data.map(hamster => (
            <div key={hamster.id} ><ProfileCard hamster={hamster}/></div>
            )
    )}

    return (
        <div>
            <h1 className="allHamsters">this is all hamsters</h1>
            <div className="hamsterList">{allHamsters}</div>
        </div>
    )
}
export default HamsterList;