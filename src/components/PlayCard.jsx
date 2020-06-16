import React from 'react';

const PlayCard = ({ hamster }) => {

    const imgUrl = "/api/assets/";

    return (
        <div className="PlayCard">
            <img src={imgUrl + hamster.imgName} alt="profile-pic" className="profile-img"/>
            <h1>{hamster.name} </h1>
            <p>age: {hamster.age}</p>
            <p>favorite food: {hamster.favFood}</p>
        </div>
    );
}

export default PlayCard;