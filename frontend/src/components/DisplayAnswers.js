import React from 'react'

function DisplayAnswers(props) {
    return(
        <span>
            <label>
                <input 
                    type="radio" 
                    name="answers" 
                    value={props.value}
                    onClick={props.onClick}
                    id={props.id}
                /> 
                
                { props.answerValue }
            </label>
            <br />
        </span>
    )
}

export default DisplayAnswers;
