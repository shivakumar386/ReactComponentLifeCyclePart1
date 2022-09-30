// import {Component} from 'react'
// import './index.css'

// class DigitalTimer extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {time: 0, isStarted: false, count: 4}
//   }

//   componentDidMount() {
//     const {count} = this.state
//     this.timerId = setInterval(() => {
//       this.setState(prevState => ({count: prevState.count - 1}))
//     }, 1000)
//   }

//   getStarted = () => {
//     this.setState(prevState => ({
//       isStarted: !prevState.isStarted,
//     }))
//   }

//   onResetTime = () => {
//     clearInterval(this.timerId)
//   }

//   onDecrement = () => {
//     const {time} = this.state
//     if (time > 0) {
//       this.setState(prevState => ({
//         time: prevState.time - 1,
//       }))
//     }
//   }

//   onIncrement = () => {
//     this.setState(prevState => ({
//       time: prevState.time + 1,
//     }))
//   }

//   render() {
//     const {time, isStarted, count} = this.state
//     const imgSrc = isStarted
//       ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
//       : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
//     const countDigit = count >= 0 ? count - 1 : time - 1
//     return (
//       <div className="bg-container">
//         <h1>Digital Timer</h1>
//         <div className="card-container">
//           <div className="time-container time">
//             <p className="display-time">
//               {time} {isStarted && countDigit}
//             </p>
//             <p>Running...</p>
//           </div>
//           <div>
//             <div className="buttons-container">
//               <button type="button" className="button">
//                 <img
//                   src={imgSrc}
//                   alt="play icon"
//                   className="play-buttons"
//                   onClick={this.getStarted}
//                 />
//                 {isStarted ? 'Pause' : 'Start'}
//               </button>
//               <button type="button" className="button">
//                 <img
//                   src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
//                   alt="reset icon"
//                   className="play-buttons"
//                   onClick={this.onResetTime}
//                 />
//                 Reset
//               </button>
//             </div>
//             <div className="increment-buttons">
//               <button
//                 type="button"
//                 className="button button-change"
//                 onClick={this.onDecrement}
//               >
//                 -
//               </button>
//               <p className="changing-time">{time}</p>
//               <button
//                 type="button"
//                 className="button button-change"
//                 onClick={this.onIncrement}
//               >
//                 +
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   }
// }

// export default DigitalTimer

import {Component} from 'react'

import './index.css'

const initialState = {
  isTimerRunning: false,
  timeElapsedInSeconds: 0,
  timerLimitInMinutes: 25,
}

class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  onDecreaseTimerLimitInMinutes = () => {
    const {timerLimitInMinutes} = this.state

    if (timerLimitInMinutes > 1) {
      this.setState(prevState => ({
        timerLimitInMinutes: prevState.timerLimitInMinutes - 1,
      }))
    }
  }

  onIncreaseTimerLimitInMinutes = () =>
    this.setState(prevState => ({
      timerLimitInMinutes: prevState.timerLimitInMinutes + 1,
    }))

  renderTimerLimitController = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state
    const isButtonsDisabled = timeElapsedInSeconds > 0

    return (
      <div className="timer-limit-controller-container">
        <p className="limit-label">Set Timer limit</p>
        <div className="timer-limit-controller">
          <button
            className="limit-controller-button"
            disabled={isButtonsDisabled}
            onClick={this.onDecreaseTimerLimitInMinutes}
            type="button"
          >
            -
          </button>
          <div className="limit-label-and-value-container">
            <p className="limit-value">{timerLimitInMinutes}</p>
          </div>
          <button
            className="limit-controller-button"
            disabled={isButtonsDisabled}
            onClick={this.onIncreaseTimerLimitInMinutes}
            type="button"
          >
            +
          </button>
        </div>
      </div>
    )
  }

  onResetTimer = () => {
    this.clearTimerInterval()
    this.setState(initialState)
  }

  incrementTimeElapsedInSeconds = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state
    const isTimerCompleted = timeElapsedInSeconds === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
      }))
    }
  }

  onStartOrPauseTimer = () => {
    const {
      isTimerRunning,
      timeElapsedInSeconds,
      timerLimitInMinutes,
    } = this.state
    const isTimerCompleted = timeElapsedInSeconds === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.setState({timeElapsedInSeconds: 0})
    }
    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  renderTimerController = () => {
    const {isTimerRunning} = this.state
    const startOrPauseImageUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const startOrPauseAltText = isTimerRunning ? 'pause icon' : 'play icon'

    return (
      <div className="timer-controller-container">
        <button
          className="timer-controller-btn"
          onClick={this.onStartOrPauseTimer}
          type="button"
        >
          <img
            alt={startOrPauseAltText}
            className="timer-controller-icon"
            src={startOrPauseImageUrl}
          />
          <p className="timer-controller-label">
            {isTimerRunning ? 'Pause' : 'Start'}
          </p>
        </button>
        <button
          className="timer-controller-btn"
          onClick={this.onResetTimer}
          type="button"
        >
          <img
            alt="reset icon"
            className="timer-controller-icon"
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
          />
          <p className="timer-controller-label">Reset</p>
        </button>
      </div>
    )
  }

  getElapsedSecondsInTimeFormat = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state
    const totalRemainingSeconds =
      timerLimitInMinutes * 60 - timeElapsedInSeconds
    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {isTimerRunning} = this.state
    const labelText = isTimerRunning ? 'Running' : 'Paused'

    return (
      <div className="app-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="digital-timer-container">
          <div className="timer-display-container">
            <div className="elapsed-time-container">
              <h1 className="elapsed-time">
                {this.getElapsedSecondsInTimeFormat()}
              </h1>
              <p className="timer-state">{labelText}</p>
            </div>
          </div>
          <div className="controls-container">
            {this.renderTimerController()}
            {this.renderTimerLimitController()}
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
