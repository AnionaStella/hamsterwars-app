import React, { useState } from 'react';

function NewHamster (){
    const [name, setName] = useState('');
    const [age, setAge] = useState(0);
    const [food, setFood] = useState('');
    const [loves, setLoves] = useState('');
    const [img, setImg] = useState('');

    const [stringTouched, setStringTouched] = useState('');
    const [numberTouched, setNumberTouched] = useState('');
    const [imgTouched, setImgTouched] = useState('');


    const stopSubmit = event => {
        event.preventDefault();
    }

    let [stringClass, stringError] = stringTouched
        ? isValidString(stringTouched)
        : ['', ''];
    let [numberClass, numberError] = numberTouched
        ? isValidNumber(numberTouched)
        : ['', ''];
    let [imgClass, imgError] = imgTouched
        ? isValidImg(imgTouched)
        : ['', ''];
    
    

    return(
        <div className="hamsterForm">
            <form onSubmit={stopSubmit}></form>
            <div>
                <label>Name: </label>
                <input type="text" placeholder="Name"
                    className={stringClass}
                    onChange={e => setName(e.target.value)}
                    onBlur={() => setStringTouched(name)}/>
                <div className="error">{stringError}</div>
            </div>
            <br/>
            <div>
                <label>Age: </label>
                <input type="number" placeholder="Age"
                    className={numberClass}
                    onChange={e => setAge(e.target.value)}
                    onBlur={() => setNumberTouched(age)}/>
                   <div className="error">{numberError}</div>
            </div> 
            <br/>
            <div>
                <label>Favorite food: </label>
                <input type="text" placeholder="Enter food"
                    className={stringClass}
                    onChange={e => setFood(e.target.value)}
                    onBlur={() => setStringTouched(food)}/>
                <div className="error">{stringError}</div>
            </div>
            <br/>
            <div>
                <label>Loves:</label>
                <input type="text" placeholder="Hobby or thing"
                    className={stringClass}
                    onChange={e => setLoves(e.target.value)}
                    onBlur={() => setStringTouched(loves)}/>
                <div className="error">{stringError}</div>
            </div>      
            <br/>
            <div>
            <label>Upload image: </label>
            <input type="file" name="image" 
                className={imgClass}
                onChange={e => setImg(e.target.value)}
                onBlur={() => setImgTouched(img)}/>/>
            <div className="error">{imgError}</div>
            </div>

        </div>
    )

}
function isValidString(value) {
    if( String(value) !== '' ) {
        return ['valid', ''];
    } else {
        return ['invalid', 'Please enter a value using letters A-Z']
    }
}
function isValidNumber(value) {
    if( String(value) !== '' ) {
        return ['valid', ''];
    } else {
        return ['invalid', 'Please enter a number']
    }
}
function isValidImg(img) {
    if( String(img) !== '' ) {
        return ['valid', ''];
    } else {
        return ['invalid', 'Please enter a title']
    }
}

export default NewHamster;