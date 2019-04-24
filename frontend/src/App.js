import React from 'react';

import './App.css';

import DisplayAnswers from './components/DisplayAnswers';

import quizData from './api/quizData';
import Timer from './components/Timer';

import DisplayResult from './components/DisplayResult';

class App extends React.Component {

	constructor() {
		super();
		
		this.state = {
			questionID: 0, 				// start from 0th question
			selectedAnswer: -1, 		// no answer's selected initially
			score: 0,					// no score initially
			onLastQuestion: false, 		// if it's true then we're on last question
			willSubmit: false,
			timerStarted: false
		};
		
		this.quizLength = quizData.length

		this.goToNextQuestion = this.goToNextQuestion.bind(this);
		this.handleAnswerClick = this.handleAnswerClick.bind(this);
		this.updateScore = this.updateScore.bind(this);
		
		// this.handleFormSubmit = this.handleFormSubmit.bind(this)
	}

	componentDidMount() {
		this.setState({
			timerStarted: true
		})
	}

	updateScore() {
		this.setState((prevState) => {
			return {
				score: prevState.score + 1
			}
		})
	}

	// Will be triggered when clicked on 'submit' or 'next' or 'play again?' button
	goToNextQuestion(event) {

		// event.preventDefault();

		// console.log("Event target ", event.target)
		
		let selectedAnswer = Number(this.state.selectedAnswer);
		let correctAnswer = quizData[this.state.questionID].correctAnswer;

		// Only go to next question if it's not the last or 2nd last question
		if(this.state.questionID < this.quizLength - 2) {

			console.log("Selected ans is ", this.state.selectedAnswer);
			console.log("Correct ans is ", quizData[this.state.questionID].correctAnswer)
			
			// update the score if selected answer is equal to correct answer
			if(selectedAnswer === correctAnswer) {
				this.updateScore()
			}

			// go to next question and refresh states
			// console.log(this	)
			this.setState((prevState) => {
				return {
					questionID: prevState.questionID + 1,
					selectedAnswer: -1,
					timerStarted: false
				}
			})
			
		}
		
		// On 2nd last question's "Next" button event, set onLastQuestion to true
		else if(this.state.questionID === this.quizLength - 2) {
			// We'll be On Last question
			this.setState({
				onLastQuestion: true
			})
			// update the score if selected answer is equal to correct answer
			if(selectedAnswer === correctAnswer) {
				this.updateScore()
			}
			// go to next question and refresh states
			this.setState((prevState) => {
				return {
					questionID: prevState.questionID + 1,
					selectedAnswer: -1
				}
			})
		}

		else if(this.state.onLastQuestion) {
			// update the score if selected answer === correct answer
			if(selectedAnswer === correctAnswer) {
				this.updateScore();			
			}

			// Update willSubmit to true here
			this.setState({
				willSubmit: true
			})

			// console.log("Final score is ", this.state.score);
		}
		
		// Uncheck radio button if checked when moving to next question
		let radioElements = document.querySelectorAll('.radioClass')
		let i;
		for(i=0; i<radioElements.length; i++){
			radioElements[i].checked = false
		}
	}


	handleAnswerClick(event) {
		// event.target.id will have the value of selected answer 
		this.setState({
			selectedAnswer: event.target.id
		})
	}

	render() {

		// if(this.refs !== undefined){
		// 	console.log("Ref is : ", this.refs)
		// }
			

		if(this.state.willSubmit) {
			return (
				<DisplayResult score={this.state.score} />
			)
		}
		
		else if(quizData[this.state.questionID]) {
			// If they are not seeing "Submit" button, display the Quiz questions
			let questionID = this.state.questionID;
			let currentQuestion = quizData[questionID]

			console.log(this.state);
			console.log("Selected ans is ", this.state.selectedAnswer);
			console.log("Correct ans is ", quizData[this.state.questionID].correctAnswer)
			console.log("State of onLastQs", this.state.onLastQuestion)

			console.log("Timer started in render ", this.state.timerStarted)

			return(
				<div className="container grid">
					<Timer
						maxTime={currentQuestion.timer}
						questionID={currentQuestion.id}
						timerStarted={this.state.timerStarted}
						onTimerEnd={this.goToNextQuestion}
					/>
					<h1>Quiz</h1>
					<h2 id="question"> {currentQuestion.id + 1}. {currentQuestion.question} </h2>
					
						{
							// render 4 answers of the current question
							currentQuestion.answerOptions.map((answer, key) => {
								return (
									<DisplayAnswers 
										key={key} 
										answerValue={answer}
										value={answer}
										onClick={this.handleAnswerClick.bind(this)}
										id={key}
										className="radioClass"
										// ref={'ref_' + answer}
										// checked={defaultChecked === }
									/>
								)
							})
						}
						
					
						{	// if we're on last question, display "Submit" button
							this.state.onLastQuestion ? 
								(<button  
									className="buttons btn btn-outline-primary btn-lg btn-block"
									onClick={this.goToNextQuestion}
									>Submit!</button>)
								: (<button 
									className="buttons btn btn-outline-primary btn-lg btn-block"
									onClick={this.goToNextQuestion}
									>Next</button>)
						}
						
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
		else {
			return(
				<DisplayResult score={this.state.score} />
			)
		}
	}
}

export default App;
