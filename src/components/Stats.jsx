import React, { useState, useEffect } from 'react';
import ProfileCard from "./ProfileCard";
import MostBattled from './MostBattled';

function Stats() {
    
    const totalUrl = '/api/stats/total';
    const [total, setTotal] = useState(null);
    const url = '/api/charts/';
    const [bestData, setBestData] = useState(null);
    const [worstData, setWorstData] = useState(null); 
    
    useEffect(() => {
        async function fetchData() {
            const resp = await fetch(totalUrl);
            const json = await resp.json();
            setTotal(json);
        }
        fetchData();
    },[]);

    useEffect(() => {
        async function fetchData() {
            const resp = await fetch(url+'top');
            const json = await resp.json();
            setBestData(json);
        }
        fetchData();
    },[]);

    useEffect(() => {
        async function fetchData() {
            const resp = await fetch(url+'bottom');
            const json = await resp.json();
            setWorstData(json);
        }
        fetchData();
    },[]);
    
    

    let bestHamsters;
    if (bestData !== null) {
         bestHamsters = bestData.map((hamster, counter) => {
            return (
                <div key={hamster.id}>{counter + 1 }. <ProfileCard hamster={hamster}/></div>
            );
         }
    )}
    
    let worstHamsters;
    if (worstData !== null) {
         worstHamsters = worstData.map((hamster, counter) => {
            return (
                <div key={hamster.id}>{counter + 1 }. <ProfileCard hamster={hamster}/></div>
            );
         }
    )}

    return (
        <div className="Stats">
            <h1>Total amount of battles: {total !== null ? total.totalGames : ''} </h1>
            <h1>Hamsters with most wins</h1>
            <div className="Stats-grid"> 
                    {bestHamsters}
            </div>
            <h1>Hamsters with most defeats</h1>
            <div className="Stats-grid">
                    {worstHamsters}
            </div>
            <h2>This hamster has had the most battles!</h2>
            <div className="Stats-grid">
                <MostBattled></MostBattled>
            </div>
        </div> 
    );
}


export default Stats;