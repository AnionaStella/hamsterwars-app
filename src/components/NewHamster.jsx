import React, { useState } from 'react';


function NewHamster () {
    const [name, setName] = useState('');
    const [age, setAge] = useState(null);
    const [food, setFood] = useState('');
    const [loves, setLoves] = useState('');
    const [newHamster, setNewHamster] = useState('');

    const [nameTouched, setNameTouched] = useState('');
    const [foodTouched, setFoodTouched] = useState('');
    const [ageTouched, setAgeTouched] = useState('');
    const [lovesTouched, setLovesTouched] = useState('');

    const stopSubmit = event => {
        event.preventDefault();
    }
    
    let [nameClass, nameError] = nameTouched
        ? isValidString(nameTouched)
        : ['', ''];
    let [foodClass, foodError] = foodTouched
        ? isValidString(foodTouched)
        : ['', ''];
    let [lovesClass, lovesError] = lovesTouched
        ? isValidString(lovesTouched)
        : ['', ''];
    let [ageClass, ageError] = ageTouched
        ? isValidNumber(ageTouched)
        : ['', ''];

    const disableButton = nameError || 
        ageError || 
        foodError || 
        lovesError || 
        name === '' || 
        age === null ||
        food === '' ||
        loves === '';    

    
    return(
        <div className="hamsterForm">
            <form onSubmit={stopSubmit}>
                <div>
                    <label>Name: </label>
                    <br/>
                    <input type="name" placeholder="Name"
                        className={nameClass}
                        onChange={e => setName(e.target.value)}
                        onBlur={() => setNameTouched(name)}/>
                    <div className="error">{nameError}</div>
                </div>
                <br/>
                <div>
                    <label>Age: </label>
                    <br/>
                    <input type="number" placeholder="Age"
                        className={ageClass}
                        onChange={e => setAge(e.target.value)}
                        onBlur={() => setAgeTouched(age)}/>
                    <div className="error">{ageError}</div>
                </div> 
                <br/>
                <div>
                    <label>Favorite food: </label>
                    <br/>
                    <input type="text" placeholder="Enter food"
                        className={foodClass}
                        onChange={e => setFood(e.target.value)}
                        onBlur={() => setFoodTouched(food)}/>
                    <div className="error">{foodError}</div>
                </div>
                <br/>
                <div>
                    <label>Loves:</label>
                    <br/>
                    <input type="text" placeholder="Hobby or thing"
                        className={lovesClass}
                        onChange={e => setLoves(e.target.value)}
                        onBlur={() => setLovesTouched(loves)}/>
                    <div className="error">{lovesError}</div>
                </div>      
                <br/>
                <button disabled={ disableButton } onClick={() => saveHamster(name, age, food, loves, setNewHamster)}>Save hamster</button>
            </form>
            <h1>{ newHamster ? newHamster + 'was added' : '' }</h1>
        </div>
    )

}

async function saveHamster (name, age, food, loves, setNewHamster) {
    let hamster = {
        name: name,
        age: age,   
        favFood: food,
        loves: loves 
    }
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(hamster)
    };
    const resp = await fetch('/api/hamsters', requestOptions)
    let savedHamster = await resp.json();
    setNewHamster(savedHamster.name)
}

function isValidString(value) {
    if( String(value).trim() !== '') {
        return ['valid', ''];
    } else {
        return ['invalid', 'Please enter a value']
    }
}

function isValidNumber(value) {
    if( !isNaN(Number(value)) ) {
        return ['valid', ''];
    } else {
        return ['invalid', 'Please enter a number']
    }
}

export default NewHamster;