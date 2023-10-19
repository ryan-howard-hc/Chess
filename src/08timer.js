import React, { Component } from 'react';


class Timer extends Component {   // constructor is a method that gets called when new instance of Timer is created, props passes the properties
  constructor(props) { 
    super(props);
    this.state = {       
      minutesRemaining: 0,   
      secondsRemaining: 0,
      isRunning: false,
      intervalId: null,     // variable used to treack interval timer, which is used for repetitive tasks, such as display timer every second
    };      // setting initial state, time at 0, interval is set at null, because the timer isnt running at start,
  }

  updateTimerDisplay() {                // function that calculates and returns formatte time
    const { secondsRemaining } = this.state;           //takes the current seconds remaining from the state in line 8
    const minutes = Math.floor(secondsRemaining / 60);
    const seconds = secondsRemaining % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }


  startTimer() {
    const { inputMinutes, isRunning, secondsRemaining } = this.state;
    const minutes = parseFloat(inputMinutes);
    if (isNaN(minutes) || minutes <= 0) {
      alert("Please enter a valid duration in minutes.");
      return;
    }
  
    if (isRunning) {
      return; // Timer is already running, do nothing
    }
  
    this.stopTimer();
    let seconds;
    if (secondsRemaining > 0) {
      // If there are remaining seconds, continue counting down
      seconds = secondsRemaining;
    } else {
      seconds = Math.floor(minutes * 60);
    }
    this.setState({ minutesRemaining: minutes, secondsRemaining: seconds, isRunning: true });
  
    const intervalId = setInterval(() => {
      const { minutesRemaining, secondsRemaining, isRunning } = this.state;
      if (secondsRemaining <= 0 || !isRunning) {
        this.stopTimer();
        if (secondsRemaining <= 0) {
          alert("Timer is up!");
        }
      } else {
        this.setState({
          minutesRemaining: minutesRemaining - 1 / 60,
          secondsRemaining: secondsRemaining - 1,
        });
      }
    }, 1000);
  
    this.setState({ intervalId });
  }

  pauseTimer() {
    const { isRunning, intervalId } = this.state;
    if (isRunning && intervalId) {
      clearInterval(intervalId);
      this.setState({ isRunning: false });
      if (this.props.onTimerSwitch) {
        this.props.onTimerSwitch(); 
      }
    }
  }

  stopTimer() {
    const { intervalId } = this.state;
    if (intervalId) {
      clearInterval(intervalId);
    }
    this.setState({ minutesRemaining: 0, secondsRemaining: 0, intervalId: null, isRunning: false });
  }

  handleInputChange(event) {
    this.setState({ inputMinutes: event.target.value });
  }

  render() {
    const { minutesRemaining, inputMinutes, isRunning } = this.state;
    return (
      <div>
        <div>{this.updateTimerDisplay()}</div>
        <input
          type="number"
          step="0.01"
          placeholder="Enter minutes"
          value={inputMinutes}
          onChange={(e) => this.handleInputChange(e)}
        />
        {isRunning ? ( // Conditional rendering based on whether the timer is running
          <button onClick={() => this.pauseTimer()}>Pause</button>
        ) : (
          <button onClick={() => this.startTimer()}>Start</button>
        )}
        <button onClick={() => this.stopTimer()}>Stop</button>
      </div>
    );
  }
}

export default Timer;