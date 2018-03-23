import React from 'react';
import './Training.css';
import Timer from "../Timer";
import Exercise from "./Exercise";


export const TimeWrapper = (Component) => {
    const p = {
        minutes: 30,
        seconds: 0
    };

    return (props) => (
        <Component minutes={p.minutes}
                   seconds={p.seconds}
        />
    )
}

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
            seconds: 0,
            minutes: 0
        }
    }
    doneExercise (index){
        this.setState((prevState) => {
            debugger;
            prevState.exercises[index].checked = true;
            prevState.exercises[index].time =
                `${prevState.timer.minutes}:${prevState.timer.seconds}`;
            return prevState;
        })

        console.log(this.state.exercises[index])
    }

    timerChange = (minutes, seconds) => {
        this.setState({
            timer: {
                minutes,
                seconds
            }
        })
    }

    trainingEnd = () => {
        this.setState({
            paused: true
        })
    }

    render () {
        return (
            <div>
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
                       minutes={this.state.timer.minutes}
                       seconds={this.state.timer.seconds}
                       pause={this.state.paused}
                />
                <button onClick={this.trainingEnd}>Закончить</button>
            </div>
        )
    }

}
