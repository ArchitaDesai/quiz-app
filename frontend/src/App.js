import React from 'react';

// import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
// import '../node_modules/bootstrap/dist/js/bootstrap'

import './App.css';

import DisplayAnswers from './components/DisplayAnswers';

// import TimerMachine from 'react-timer-machine';
// import moment from 'moment';
// import momentDurationFormatSetup from 'moment-duration-format';

import quizData from './api/quizData';

// momentDurationFormatSetup(moment);

class App extends React.Component {

	constructor() {
		super();
		
		this.state = {
			questionID: 0, 		// start from 0th question
			question: '',
			answerOptions: [],
			selectedAnswer: -1, // no answer's selected initially
			score: 0			// no score initially
		};
		
		this.quizLength = quizData.length

		this.goNextQuestion = this.goNextQuestion.bind(this);
	}

	goNextQuestion() {
		
		console.log(this.quizLength);
		// this.setState((prevState) => {

		// })
	}

	render() {
		let questionID = this.state.questionID;
		return(
			<div>
				<h2> {quizData[questionID].question} </h2>

					{
						// render 4 answers of the current question
						quizData[questionID].answerOptions.map((answer, key) => {
							return (
								<DisplayAnswers key={key} answerValue={answer}/>
							)
						})
					}

				<button onClick={this.goNextQuestion}>Next</button>
			</div>
			/* <div>
				<div className="grid">
				<div id="quiz">
					<h1>Quiz</h1>
					<hr style={{marginTop: "20px"}} />
					
					<p id="question">What is the blah blah blah?</p>

					<Answers />
					
				</div>

				<hr style={{marginTop: "50px"}}/>
				
				<footer>
					<p id="progress">Question x of y.</p>
				</footer>

				</div>    
			</div> */
		)
	}
}

export default App;
