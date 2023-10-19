import React, { Component } from 'react';


class Timer extends Component {   // constructor is a method that gets called when new instance of Timer is created, props passes the properties
  constructor(props) { 
    super(props);
    this.state = {          
      secondsRemaining: 0,
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
    const { inputSeconds } = this.state;
    const durationInSeconds = parseInt(inputSeconds, 10); // Parse the user's input as an integer
    if (isNaN(durationInSeconds) || durationInSeconds <= 0) {
      alert("Please enter a valid duration in seconds.");
      return;
    }

    this.stopTimer();
    this.setState({ secondsRemaining: durationInSeconds });

    const intervalId = setInterval(() => {
      const { secondsRemaining } = this.state;
      this.setState({ secondsRemaining: secondsRemaining - 1 });

      if (secondsRemaining <= 0) {
        this.stopTimer();
        alert("Timer is up!");
      }
    }, 1000);

    this.setState({ intervalId });
  }

  stopTimer() {
    const { intervalId } = this.state;
    if (intervalId) {
      clearInterval(intervalId);
      this.setState({ secondsRemaining: 0, intervalId: null });
    }
  }

  handleInputChange(event) {
    this.setState({ inputSeconds: event.target.value });
  }

  render() {
    const { secondsRemaining, inputSeconds } = this.state;
    return (
      <div>
        <div>{this.updateTimerDisplay()}</div>
        <input
          type="number"
          placeholder="Enter seconds"
          value={inputSeconds}
          onChange={(e) => this.handleInputChange(e)}
        />
        <button onClick={() => this.startTimer()}>Start Timer</button>
        <button onClick={() => this.stopTimer()}>Stop Timer</button>
      </div>
    );
  }
}

export default Timer;