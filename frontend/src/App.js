import React from 'react';

import './App.css';

import DisplayAnswers from './components/DisplayAnswers';


import quizData from './api/quizData';
import Timer from './components/Timer';


class App extends React.Component {

	constructor() {
		super();
		
		this.state = {
			questionID: 0, 				// start from 0th question
			selectedAnswer: -1, 		// no answer's selected initially
			score: 0,					// no score initially
			onLastQuestion: false, 		// if it's true then we're on last question
			willSubmit: false
		};
		
		this.quizLength = quizData.length

		this.goToNextQuestion = this.goToNextQuestion.bind(this);
		this.handleAnswerClick = this.handleAnswerClick.bind(this);
		this.updateScore = this.updateScore.bind(this);
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
					selectedAnswer: -1
				}
			})
		}
		
		// On 2nd last question's "Next" button event, set onLastQuestion to true
		else if(this.state.questionID === this.quizLength - 2) {
			// We'll be On Last question
			this.setState({
				onLastQuestion: true
			})
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
	}


	handleAnswerClick(event) {
		// event.target.id will have the value of selected answer 
		this.setState({
			selectedAnswer: event.target.id
		})
	}

	render() {

		if(this.state.willSubmit) {
			return (
				<h2>The score is { this.state.score }</h2>
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

			return(
				<div>
					<Timer  
						time={currentQuestion.timer}
						timerCompleted={this.goToNextQuestion}
						/>
					<h2> {currentQuestion.id}. {currentQuestion.question} </h2>

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
										// checked={defaultChecked === }
									/>
								)
							})
						}
					
					{	// if we're on last question, display "Submit" button
						this.state.onLastQuestion ? 
							(<button onClick={this.goToNextQuestion}>Submit!</button>)
							: (<button onClick={this.goToNextQuestion}>Next</button>)
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
			return(<h2>The score is { this.state.score }</h2>)
		}
	}
}

export default App;
