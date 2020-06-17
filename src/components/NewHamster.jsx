import React, { useState } from 'react';


function NewHamster (){
    const [name, setName] = useState('');
    const [age, setAge] = useState(0);
    const [food, setFood] = useState('');
    const [loves, setLoves] = useState('');
    const [img, setImg] = useState('');
    const [newHamster, setNewHamster] = useState('');

    const [nameTouched, setNameTouched] = useState('');
    const [foodTouched, setFoodTouched] = useState('');
    const [ageTouched, setAgeTouched] = useState('');
    const [lovesTouched, setLovesTouched] = useState('');
    const [imgTouched, setImgTouched] = useState('');


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
    let [imgClass, imgError] = imgTouched
        ? isValidImg(imgTouched)
        : ['', ''];
    
    

    return(
        <div className="hamsterForm">
            <form onSubmit={stopSubmit}>
                <div>
                    <label>Name: </label>
                    <input type="text" placeholder="Name"
                        className={nameClass}
                        onChange={e => setName(e.target.value)}
                        onBlur={() => setNameTouched(name)}/>
                    <div className="error">{nameError}</div>
                </div>
                <br/>
                <div>
                    <label>Age: </label>
                    <input type="number" placeholder="Age"
                        className={ageClass}
                        onChange={e => setAge(e.target.value)}
                        onBlur={() => setAgeTouched(age)}/>
                    <div className="error">{ageError}</div>
                </div> 
                <br/>
                <div>
                    <label>Favorite food: </label>
                    <input type="text" placeholder="Enter food"
                        className={foodClass}
                        onChange={e => setFood(e.target.value)}
                        onBlur={() => setFoodTouched(food)}/>
                    <div className="error">{foodError}</div>
                </div>
                <br/>
                <div>
                    <label>Loves:</label>
                    <input type="text" placeholder="Hobby or thing"
                        className={lovesClass}
                        onChange={e => setLoves(e.target.value)}
                        onBlur={() => setLovesTouched(loves)}/>
                    <div className="error">{lovesError}</div>
                </div>      
                <br/>
                <div>
                <label>Upload image: </label>
                <input type="file" name="image" 
                    className={imgClass}
                    onChange={e => setImg(e.target.value)}
                    onBlur={() => setImgTouched(img)}/>
                <div className="error">{imgError}</div>
                </div>
                <button onClick={() => saveHamster(name, age, food, loves, setNewHamster)}>Save hamster</button>
            </form>
            <h1>{ newHamster ? newHamster + 'was added' : '' }</h1>
        </div>
    )

}

async function saveHamster (name, age, food, loves, setNewHamster){
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
    console.log('before fetch')
    const resp = await fetch('/api/hamsters', requestOptions)
    let savedHamster = await resp.json();
    console.log(savedHamster);
    setNewHamster(savedHamster.name)
}

function isValidString(value) {
    if( String(value).length > 0) {
        return ['valid', ''];
    } else {
        return ['invalid', 'Please enter a value']
    }
}
function isValidNumber(value) {
    if( Number(value) > 0) {
        return ['valid', ''];
    } else {
        return ['invalid', 'Please enter a number']
    }
}
function isValidImg(img) {
    if( img.includes('jpeg || jpg || png') ) {
        return ['valid', ''];
    } else {
        return ['invalid', 'File format must be  jpg, png or jpeg ']
    }
}

export default NewHamster;