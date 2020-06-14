import React from 'react';

const ProfileCard = ({ hamster }) => {

    // får en hamster via props
    const imgUrl = "http://localhost:3003/assets/";

    return (
        <div className="ProfileCard">
            <img src={imgUrl + hamster.imgName} alt="profile-pic" className="profile-img"/>
            <h1>{hamster.name} </h1>
            <p>age: {hamster.age}</p>
            <p>favorite food: {hamster.favFood}</p>
            <p>hobby:{hamster.loves}</p>
            <p>wins: {hamster.wins} </p>
            <p>defeats: {hamster.defeats}</p>
            <p>total games played: {hamster.games}</p>
        </div>
    );
}
export default ProfileCard;
// Make a card that renders hamster and info for the voting