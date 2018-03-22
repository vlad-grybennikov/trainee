import React from 'react';
import './Training.css';
import Timer from "../Timer";
import Exercise from "./Exercise";
import styled from 'styled-components';

const Wrapper = styled.div`
    display:flex;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
    background-color: #dedede;
    color: #000;
    padding: 20px 45px;
    box-sizing: border-box;
    font-family: Montserrat, sans-serif;
`;

export const TimeWrapper = (Component, props) => {
    //const props = {
    //    minutes: 30,
    //    seconds: 0
    //};

    return (
        <Component minutes={props.minutes}
                   seconds={props.seconds}
        />
    )
};

export default class Training extends React.Component {
    state = {
        exercises : [{
            name: 'exercise 1',
            checked: false,
            time:null
        },{
            name: 'exercise 2',
            checked: false,
            time:null
        },{
            name: 'exercise 3',
            checked: false,
            time:null
        }],
        timer: {
            minutes: 0,
            seconds: 5,
            paused: false,
            reverse: false,
            started: false
        }
    };

    startTimer = () => {
        this.setState({
            timer: {
                paused: false,
                started: true
            }
        })
    };

    doneExercise (index){
        this.setState((prevState) => {
            debugger;
            prevState.exercises[index].checked = true;
            prevState.exercises[index].time =
                `${prevState.timer.minutes}:${prevState.timer.seconds}`;
            return prevState;
        });

        console.log(this.state.exercises[index])
    }

    timerChange = (minutes, seconds) => {
        this.setState({
            timer: {
                minutes,
                seconds
            }
        })
    };

    trainingEnd = () => {
        this.setState({
            paused: true
        })
    };

    render () {
        return (
            <Wrapper>
                <h2>Тренировка</h2>
                <div className="container">
                    {
                        this.state.exercises.map((exercise, index) =>{
                        return <Exercise name={exercise.name}
                                         checked={exercise.checked}
                                         doneExercise={this.doneExercise.bind(this, index)}
                        />
                    })}
                </div>
                <Timer onTimerChange={this.timerChange}
                       onTimerStart={this.startTimer}
                       minutes={this.state.timer.minutes}
                       seconds={this.state.timer.seconds}
                       revers={this.state.timer.reverse}
                />

                <button onClick={!this.state.timer.started ? this.startTimer : ''}>Start</button>
                <button onClick={this.trainingEnd}>Закончить</button>
            </Wrapper>
        )
    }
}
