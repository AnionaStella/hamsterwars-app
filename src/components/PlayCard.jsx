import React from 'react';

const PlayCard = ({ hamster }) => {

    const imgUrl = "/api/assets/";

    return (
        <div className="PlayCard">
            <img src={imgUrl + hamster.imgName} alt="profile-pic" className="profile-img"/>
            <h1> {hamster.name} </h1>
            <p>Age: {hamster.age}</p>
            <p>Favorite food: {hamster.favFood}</p>
            <p>Loves: {hamster.loves}</p>
        </div>
    );
}

export default PlayCard;