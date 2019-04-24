import React from 'react'

import TimerMachine from 'react-timer-machine';

import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';

momentDurationFormatSetup(moment);

class Timer extends React.Component {
    
      constructor(props) {
        super(props);
        this.state = {
          // maxTime: this.props.maxTime,
          time:this.props.maxTime
        };
        
        // this.startTimer = this.startTimer.bind(this)
        this.timerLoop = this.timerLoop.bind(this)
      }
    
      // Will start running timer as soon as quiz app loads
      componentDidMount() {
        console.log("componentDidMount");
        let maxTime = this.props.maxTime
        let timeIndex = maxTime
        this.timerLoop(timeIndex, maxTime);
        
      }
    
      componentWillReceiveProps(nextProps) {
        console.log("Qs ID in timer ", this.props.questionID,nextProps.questionID)
        let currentQuestion = this.props.questionID
        let nextQuestion = nextProps.questionID

        if(currentQuestion !== nextQuestion) {
          // Clear previous timer
          clearTimeout(this.timer);

          // Set a new timer from beginning for a new Qs
          let maxTime = this.props.maxTime
          let timeIndex = maxTime
          this.setState({
            maxTime: nextProps.maxTime
          },this.timerLoop(maxTime, timeIndex));
        }
      }

    timerLoop (maxTime, timeIndex) {

        console.log("And time is ", this.state.time)                  

        // console.log(timeIndex,maxTime)
        let self = this
        // let timeIndex = this.maxTime
        this.timer = setTimeout(function () {
            self.setState({
              time:timeIndex
            }, () => {
              timeIndex--;
              if(self.timerLoop instanceof Function && timeIndex > 0){
                self.timerLoop(maxTime, timeIndex);                             
              }
              else if(timeIndex<=1) {
                console.log("typeof self.props.onTimerEnd", typeof self.props.onTimerEnd)
                if(typeof self.props.onTimerEnd==="function" ){ 
                  self.props.onTimerEnd();
                  console.log("ONTIMERND", self.props.onTimerEnd)
                }
              }
            })
            
        }, 1000)
      }
      
      render() {
        
        console.log("Current Time ", this.state.time)
        return (
          <div>
             {this.state.time}
          </div>
        );
      }


}

export default Timer
