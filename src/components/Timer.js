import React, {Component} from "react";
import PropTypes from "prop-types";
import moment from "moment";

console.log(moment());

export default  class Timer extends Component{
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
}
