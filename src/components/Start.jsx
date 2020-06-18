import React from 'react';
import { Link } from 'react-router-dom';

const Start = () => (

    <div className="Start">
        <h1>Welcome to Hamster Wars</h1>
        <h3>Here you will choose a winner between battling hamsters, based on cuteness or whatever you fancy. </h3>
        <h3>To start at battle, click on the tab above or on the button below.</h3>
        <h2>Let the wars begin!</h2>
        <Link to="/battle">Battle</Link>
    </div>

);

 export default Start;