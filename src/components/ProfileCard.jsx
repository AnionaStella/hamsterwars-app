import React from 'react';

const ProfileCard = ({ hamster }) => {

    // får en hamster via props
    const imgUrl = "/api/assets/";

    return (
        <div className="ProfileCard">
            <img src={imgUrl + hamster.imgName} alt="profile-pic" className="profile-img"/>
            <h1>{hamster.name} (id: {hamster.id}) </h1>
            <p>Age: {hamster.age}</p>
            <p>Favorite food: {hamster.favFood}</p>
            <p>Hobby: {hamster.loves}</p>
            <p>Wins: {hamster.wins} </p>
            <p>Defeats: {hamster.defeats}</p>
            <p>Total games played: {hamster.games}</p>
        </div>
    );
}
export default ProfileCard;
// Make a card that renders hamster and info for the voting