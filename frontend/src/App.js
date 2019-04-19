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
			// question: '',
			// answerOptions: [],
			selectedAnswer: -1, // no answer's selected initially
			score: 0			// no score initially
		};
		
		this.quizLength = quizData.length

		this.goNextQuestion = this.goNextQuestion.bind(this);
		this.handleAnswerClick = this.handleAnswerClick.bind(this);
	}

	// Will be triggered when clicked on 'submit' or 'next' or 'play again?' button
	goNextQuestion(event) {
		// event.preventDefault();
		// Only go to next question if it's not the last question
		if(this.state.questionID !== this.quizLength - 1) {

			console.log("Going next")
			console.log("Selected ans is ", this.state.selectedAnswer);
			console.log("Correct ans is ", quizData[this.state.questionID].correctAnswer)
			
			let selectedAnswer = Number(this.state.selectedAnswer);
			let correctAnswer = quizData[this.state.questionID].correctAnswer
			
			// update the score if selected answer is equal to correct answer
			if(selectedAnswer === correctAnswer) {
				
				console.log("Score is ", this.state.score);
				console.log("Qs id is ", this.state.questionID);
				
				this.setState((prevState) => {
					return {
						score: prevState.score + 1,
						questionID: prevState.questionID + 1,
						// change selectedAnswer to -1 again
						// selectedAnswer: -1 
					}
				})
			} else {
				this.setState((prevState) => {
					return {
						questionID: prevState.questionID + 1,
						// selectedAnswer: -1
					}
				})
			}
		}

		// else if it's last question, have a diff on submit event 
		// and remove events on clicking button
		else if(this.state.questionID === this.quizLength - 1) {

			let selectedAnswer = Number(this.state.selectedAnswer);
			let correctAnswer = quizData[this.state.questionID].correctAnswer
			
			// update the score if selected answer is equal to correct answer
			if(selectedAnswer === correctAnswer) {
				
				console.log("Score is ", this.state.score);
				console.log("Qs id is ", this.state.questionID);
				
				this.setState((prevState) => {
					return {
						score: prevState.score + 1
					}
				})
			}

			console.log("Final score is ", this.state.score);
		}
	}


	handleAnswerClick(event) {
		// event.target.id will have the value of selected answer 
		this.setState({
			selectedAnswer: event.target.id
		})
	}

	render() {
		let questionID = this.state.questionID;
		console.log(this.state);
		console.log("Selected ans is ", this.state.selectedAnswer);
		console.log("Correct ans is ", quizData[this.state.questionID].correctAnswer)
		return(
			<div>
				<h2> {quizData[questionID].question} </h2>

					{
						// render 4 answers of the current question
						quizData[questionID].answerOptions.map((answer, key) => {
							return (
								<DisplayAnswers 
									key={key} 
									answerValue={answer}
									value={answer}
									onClick={this.handleAnswerClick.bind(this)}
									id={key}
								/>
							)
						})
					}

				<button onClick={this.goNextQuestion}>Next</button>
			</div>

			// keep below line to add similar styles, in case
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
