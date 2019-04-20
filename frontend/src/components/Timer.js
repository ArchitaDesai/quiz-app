import React from 'react'

import TimerMachine from 'react-timer-machine';

import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';

momentDurationFormatSetup(moment);

class Timer extends React.Component {
    
      constructor(props) {
        super(props);
    
        this.state = {
          started: false,
          countdown: true
        };
    
      }
    
      // Will start running timer as soon as quiz app loads
      componentDidMount() {
          this.setState({
              started: true
          })
      }
    

      render() {
        const { started, countdown } = this.state;
        // console.log(this.props)
    
        return (
          <div>
              <TimerMachine
                timeStart={this.props.time * 1000}
                started={started}
                countdown={countdown}
                interval={1000}
                
                formatTimer={(time, ms) =>
                  moment.duration(ms, "milliseconds").format("h:mm:ss")
                }

                onStart={time =>
                  console.info(`Timer started: ${JSON.stringify(time)}`)
                }
                // onStop={time =>
                //   console.info(`Timer stopped: ${JSON.stringify(time)}`)
                // }
                
                onComplete={this.props.timerCompleted}
                
              />
                {/* <br />
                <button onClick={onNextClick}>Next</button>
                
                <br />
                <button onSubmit={onSubmitClick}>Submit</button> */}
              
          </div>
        );
      }


}

export default Timer
