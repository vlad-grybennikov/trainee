import React, {Component} from "react";
import PropTypes from "prop-types";
import moment from "moment";
import styled from 'styled-components';


export const Mask = styled.div`
   width: 100%;
   height: 20px; 
   position: relative;
`;

const Progress = styled.div`
  width: 100%;
  height: 20px;
  background: linear-gradient(to right, #1e5799 0%, #ff8989 100%);
  position: absolute;
  top: 0;
  left: 0;
`;

export default class Timer extends Component {
    state = {
        minutes: 0,
        seconds: 10,
        started: false,
        paused: false,
        width: '',
        transition: 'all 1s linear'
    };

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    tickTimer = (point) => {
        if (this.state.seconds > 0 && this.state.seconds <= 59) {
            this.setState({
                seconds: this.state.seconds - 1
            })
        } else if (this.state.minutes > 0 && this.state.seconds <= 0) {
            this.setState({
                minutes: this.state.minutes - 1,
                seconds: 59
            })
        } else if (this.state.minutes <= 0 && this.state.seconds <= 0) {
            clearInterval(this.timer);
            this.setState({
                minutes: 0,
                seconds: 0
            })
        } else if (this.state.seconds <= 0) {
            clearInterval(this.timer);
            this.setState({
                seconds: 59,
            })
        }

        this.setState({
            width: this.state.width - point
        });
    };

    startTimer = () => {
        let timeInSeconds = this.state.minutes * 60 + this.state.seconds;
        let point = this.mask.clientWidth / timeInSeconds;

        this.timer = setInterval(this.tickTimer.bind(this, point), 1000);
        this.setState ({
            started: true,
            paused: false,
            width: this.mask.clientWidth
        });
    };

    pauseTimer = () => {
        clearInterval(this.timer);
        this.setState ({
            paused: true
        })
    };

    render() {
        let {minutes, seconds} = this.state;
        return(
            <div>
                <span>{
                    (minutes < 10) ? "0" + minutes : minutes
                }</span>
                :
                <span className="seconds">{
                    (seconds < 10) ? "0" + seconds : seconds
                }</span>

                <button onClick={this.state.started !== true ? this.startTimer : ''}>Start</button>
                <button onClick={this.state.paused ? this.startTimer : this.pauseTimer}>Pause</button>
                <Mask style={ this.state } innerRef={(node) => {this.mask2 = node;}}>
                    <Progress innerRef={(node) => {this.mask = node;}}/>
                </Mask>
            </div>
        )
    }
}




/*export default  class Timer extends Component{
    static propTypes = {
        minutes: PropTypes.number.isRequired,
        seconds: PropTypes.number.isRequired,
        onTimerChange: PropTypes.func,
        onTimerEnd: PropTypes.func,
        pause: PropTypes.bool,
        reverse: PropTypes.bool,
        delay: PropTypes.number
    }

    static defaultProps = {
        minutes: 0,
        seconds: 0,
        delay: 1,
        onTimerChange: () => {},
        onTimerEnd: () => {}
    }

    state = {
        minutes: this.props.minutes,
        seconds: this.props.seconds
    }

    shouldComponentUpdate(nextProps, nextState){
        if(nextProps.minutes == this.state.minutes &&
            nextProps.seconds == this.state.seconds){
            return false;
        }
        return nextState.seconds % this.props.delay === 0 ||
                nextProps.seconds % this.props.delay === 0;
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            minutes: nextProps.minutes,
            seconds: nextProps.seconds
        })
    }

    componentDidUpdate(prevProps, prevState){
        if(this.props.pause){
            clearInterval(this.interval);
        }
        this.props.onTimerChange(this.state.minutes, this.state.seconds);
    }

    componentDidMount(){
        this.interval = setInterval(() => {
            console.log("One second");
            this.setState((prevState) => {
                let minutes = parseInt(this.state.minutes);
                let seconds = parseInt(this.state.seconds);
                this.props.reverse ? seconds-- : seconds++;
                if(!this.props.reverse && seconds > 59) {
                    seconds = 0;
                    minutes++;
                } else if(this.props.reverse && seconds < 1 && minutes > 0){
                    seconds = 59;
                    minutes--;
                } else if(minutes === 0 && seconds === 0){
                    clearInterval(this.interval);
                    this.props.onTimerEnd();
                }
                return {
                    minutes,
                    seconds
                }
            });
        }, 1000)
    }

    componentWillUnmount(){
        clearInterval(this.interval)
    }

    render(){
        let {minutes, seconds} = this.state;
        return (
            <div className="timer" style={{
                fontSize: "64px"
            }}>
                <span className="minutes">{
                    (minutes < 10) ? "0" + minutes : minutes
                }</span>
                :
                <span className="seconds">{
                    (seconds < 10) ? "0" + seconds : seconds
                }</span>
            </div>
        )
    }
}*/
