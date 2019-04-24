import React from 'react'

import './DisplayAnswers.css'

function DisplayAnswers(props) {
    return(
        <span>
            <label className="answerOptions">
                <input 
                    type="radio" 
                    name="answers" 
                    value={props.value}
                    onClick={props.onClick}
                    id={props.id}
                    ref={props.ref}
                    className={props.className}
                /> 
                
                <span className="answerText">
                    { props.answerValue }
                </span>
            </label>
            
            <br />
        </span>
    )
}

export default DisplayAnswers;
