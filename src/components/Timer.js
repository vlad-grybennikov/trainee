import React, {Component} from "react";
import PropTypes from "prop-types";
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 110px;
  background-color: #fff;
  box-shadow: 0 50px 50px 0 rgba(0, 0, 0, 0.15);
  position: relative;
  display: flex;
  align-items: center;
  padding: 15px;
  box-sizing: border-box;
`;

const Time = styled.div`
  margin: 0 auto;
  font-family: Chivo, sans-serif;
  font-size: 50px;
  color: #000;
`;

const Action = styled.div`
  width: 20px;
  height: 20px;
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translate(0, -50%);
`;

const Title = styled.h6`
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 0 0 0 14px;
  font-family: Montserrat, sans-serif;
  font-size: 10px;
  color: rgba(0,0,0,.4);
  &::before {
    content: '';
    width: 10px;
    height: 10px;
    background-image: url("../assets/icons/icon-clock.svg");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 10px, 10px;
    position: absolute;
    top: 2px;
    left: 0;
  }
`;

const Mask = styled.div`
  height: 14px; 
  position: absolute;
  right: 0;
  background-color: #fff;
  transition: width 1s linear;
`;

const Progress = styled.div`
  width: 100%;
  height: 14px;
  background: linear-gradient(to right, #1e5799 0%, #ff8989 100%);
  position: absolute;
  bottom: 0;
  left: 0;
`;

export default class Timer extends Component {
    static propTypes = {
        paused: PropTypes.bool,
        time: PropTypes.number,
        reverse: PropTypes.bool,
        onTimerEnd: PropTypes.func,
        onTimerChange: PropTypes.func,
        onTimerStart: PropTypes.func
    };

    static defaultProps = {
        paused: true,
        time: 0,
        reverse: false,
        onTimerEnd: ()=>{},
        onTimerChange: ()=>{},
        onTimerStart: ()=>{}
    };

    state = {
        minutes: this.props.minutes,
        seconds: this.props.seconds,
        time: '',
        started: false,
        paused: this.props.paused,
        width: 0
    };

    componentWillUnmount() {
        clearInterval(this.timer);
    };

    componentWillReceiveProps(nextProps) {
        this.setState({
            //minutes: nextProps.minutes,
            //seconds: nextProps.seconds,
            paused: nextProps.paused
        });
        nextProps.paused ? this.startTimer() : console.log('bla');
    }

    tickTimer = (point) => {
        let minutes = this.state.minutes;
        let seconds = this.state.seconds;

        this.props.reverse ? seconds++ : seconds--;

        if(this.props.reverse && seconds > 59) {
            console.log('1');
            seconds = 0;
            minutes++;
        } else if(!this.props.reverse && seconds < 1 && minutes > 0){
            console.log('2');
            seconds = 59;
            minutes--;
        } else if(minutes < 1 && seconds < 1){
            console.log('3');
            clearInterval(this.timer);
            point = 0;
        }

        this.setState({
            minutes: minutes,
            seconds: seconds,
            width: this.state.width + point
        });
       //console.log(this.state.width + point);
    };

    startTimer = () => {
        let timeInSeconds = this.state.minutes * 60 + this.state.seconds;
        if (!this.state.started){
            let point = this.progress.clientWidth / timeInSeconds;
            this.timer = setInterval(this.tickTimer.bind(this, point), 1000);
            this.setState ({
                started: true,
                time: timeInSeconds,
                paused: false,
                width: this.state.width + point
            });
        } else if (this.state.started && this.state.paused) {
            let point = (this.progress.clientWidth - this.mask.clientWidth) / timeInSeconds;
            this.timer = setInterval(this.tickTimer.bind(this, point), 1000);
            this.setState ({
                started: true,
                time: timeInSeconds,
                paused: false,
                width: this.mask.clientWidth + point
            });
        }
        console.log(this.mask.clientWidth);
    };

    pauseTimer = () => {
        clearInterval(this.timer);
        this.setState ({
            paused: true,
            width: this.mask.clientWidth
        });
    };

    render() {
        let {minutes, seconds} = this.state;
        return(
            <Container>
                <Title>Time Left</Title>
                <Time>
                    <span>{
                        (minutes < 10) ? "0" + minutes : minutes
                    }</span>
                    :
                    <span>{
                        (seconds < 10) ? "0" + seconds : seconds
                    }</span>
                </Time>
                <Action onClick={this.state.paused ? this.startTimer : this.pauseTimer}>
                    <img src={!this.state.paused ? '../assets/icons/icon-pause.svg' : '../assets/icons/icon-play.svg'}
                         width='20px'/>
                </Action>
                <Progress innerRef={(node) => {this.progress = node;}}>
                    <Mask style={this.state} innerRef={(node) => {this.mask = node;}}/>
                </Progress>
            </Container>
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
