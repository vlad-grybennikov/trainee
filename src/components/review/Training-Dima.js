import React, {Component} from 'react';
import Tasks from './Tasks.js';
import '../html/style.css'

class Training extends Component {
    state = {
        active: false,
        Tasks: ['task1','task2','task3','task4','task5','task6'],
        dateInit: new Date(),
        dateComplete: [],
        dateStop: '',
        styles: {
            display: 'none',
        },
    };
    timeToHuman = (timeIn) => {
        let sec = timeIn / 1000;
        let min = sec / 60;
        let hour = min / 60;
        return {sec: Math.floor(sec) % 60,
            min: Math.floor(min) % 60,
            hour: Math.floor(hour) % 24}
    };
    dateAdd = () => {
        let dateNow = Date.now();
        this.setState((prevState) => {
            prevState.dateComplete.push(dateNow - this.state.dateInit);
            return prevState;
        })
    };
    dateStop = () => {
        let stopDate = new Date();
        stopDate.getMinutes() - this.state.dateInit.getMinutes();
        let summDate = this.state.dateComplete.reduce((acum, item) => {
            return acum + item;
        });
        this.setState( { dateStop: this.timeToHuman(summDate),
            styles: {display: 'block'}} );
    };
    render () {
        // setInterval(()=>{
        //     let resultTime = Date.now() - this.state.dateInit;
        //     let humanTime = this.timeToHuman(resultTime);
        //     // console.log('human',humanTime);
        //
        // } ,1000);

        return (
            <div>
                {this.state.Tasks.map((task, index) => {
                    return <Tasks key={index} name={item} id={item} addTime={this.dateAdd} />
                    return <Tasks checked={task.chacked} disabled={this.state.done} />
                })}
                <div>
                    <h2>Тренировка длиться</h2>
                    <span>33:44:55</span>
                    <span>========</span>
                    <button onClick={this.dateStop}>Завершить</button>
                    <span style={this.state.styles}> result: -> {this.state.dateStop.hour+":"+this.state.dateStop.min+':'+this.state.dateStop.sec}</span>
                </div>
            </div>
        )
    }
}
export default Training;