import React, {Component} from 'react';
// import Trener from "./Trener";

class CheckList extends Component {
    constructor(props){
        super(props);
        this.state={
            time: {
                sec: 0,
                min: 0,
            },

            lessons: [{name: "Упражнение 1", visible: true},
                {name: "Упражнение 2", visible: true},
                {name: "Упражнение 3", visible: true},
                {name: "Упражнение 4", visible: true},
                {name: "Упражнение 5", visible: true}]

        }

    }



    timer= () => {
        // this.setState((prevState) => {})
        let newSec = {...this.state}; // Not Recommended!
        newSec.time.sec++;
        this.setState(newSec);
    };

    // componentDidMount() {
    //     // this.interval = setInterval(() => this.timer(), 1000);
    // }


    done = (index)=>{

        let newState = Object.assign({}, this.state);
        newState.lessons[index].visible = !newState.lessons[index].visible;
        this.setState(newState);
    };

    start = ()=> {
        this.count = setInterval(this.timer, 1000);
    }

    finish = () => {
        clearInterval(this.count);
        alert ("Добавлено");
    };






    render (){
        return(
            <div>
                <div className="wrapper">

                    <h3>ТРЕНИРОВКА</h3>
                    <p>Тренировка длится</p>

                    <p>{Math.trunc((this.state.time.sec)/60)} :min {(this.state.time.sec)%60} :сек</p>




                    {this.state.lessons.map((lesson, index)=>{

                        return <div className={`exercise ${lesson.visible ? "" : "text-line"}`}>
                            <input onClick={this.done.bind(index)} type="checkbox"/>{lesson.name}</div>
                    })}





                    <button onClick={this.start}>Start</button>
                    <button onClick={this.finish}>Закончить</button>




                </div>
            </div>



        )
    }
}


export default CheckList;