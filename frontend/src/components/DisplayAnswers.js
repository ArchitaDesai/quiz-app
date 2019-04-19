import React from 'react'

function DisplayAnswers(props) {
    return(
        <div>
            <label>
                <input type="radio" /> {props.answerValue}
            </label>
            <br />
        </div>
    )
}

export default DisplayAnswers;
