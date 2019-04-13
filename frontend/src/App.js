import React from 'react';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap'

import './App.css';

import Answers from './components/Answers';

import TimerMachine from 'react-timer-machine';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';


momentDurationFormatSetup(moment);

class App extends React.Component {

	constructor() {
		super()
		this.state = {
			questionID: -1
		}
	}


	render(){
		return(
			<TimerMachine
				timeStart={10 * 1000} // start at 10 seconds
				started={true}
				paused={false}
				countdown={true} // counts down instead of up
				interval={1000} // tick every 1 second
				formatTimer={(time, ms) =>
				moment.duration(ms, "milliseconds").format("h:mm:ss")
				}
				onStart={time =>
				console.info(`Timer started: ${JSON.stringify(time)}`)
				}
				onStop={time =>
				console.info(`Timer stopped: ${JSON.stringify(time)}`)
				}
				onTick={time =>
				console.info(`Timer ticked: ${JSON.stringify(time)}`)
				}
				onPause={time =>
				console.info(`Timer paused: ${JSON.stringify(time)}`)
				}
				onResume={time =>
				console.info(`Timer resumed: ${JSON.stringify(time)}`)
				}
				onComplete={time =>
				console.info(`Timer completed: ${JSON.stringify(time)}`)
				}
			/>
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
