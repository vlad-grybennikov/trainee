import React, {Component} from 'react';
import Timer from "./Timer";




class Check extends Component {
    constructor(props){
        super(props);
        this.state={
            time: {
                sec: "30",
            },
            lessons: [{
                name:"Упражнение 1"
            }, {
                name:"Упражнение 2"
            }, {
                name:"Упражнение 3"
            }, {
                name:"Упражнение 4"
            }]
        }
    }



    addNew(){
        // this.setState((prevState) => {})
        let addNewUser = Object.assign({}, this.state);

        addNewUser.lessons.push({
            name: "Упражнение 1"
        });
        this.setState(addNewUser);
    }

    addNew1(){
        let addNewUser = Object.assign({}, this.state);
        addNewUser.lessons.push({
            name:"Упражнение 2"
        });
        this.setState(addNewUser)
    }

    addNew2(){
        let addNewUser = Object.assign({}, this.state);
        addNewUser.lessons.push({
            name:"Упражнение 3"
        });
        this.setState(addNewUser)
    }

    addNew3(){
        let addNewUser = Object.assign({}, this.state);
        addNewUser.lessons.push({
            name:"Упражнение 4"
        });
        this.setState(addNewUser)
    }

    addSome = () => {
        let some = ["приседание","отжимание","бег"].splice()
    }



    stop = () => {
        alert("Отдохни")
    };

    int = () => {
        setTimeout(() => this.stop(),30000)
    };


    timer= () => {
        let newSec={...this.state};
        newSec.time.sec-=1;
        if(newSec.time.sec === 25){
            return this.addNew()
        }
        if(newSec.time.sec === 20){
            return this.addNew1()
        }
        if(newSec.time.sec === 15){
            return this.addNew2()
        }
        if(newSec.time.sec === 10){
            return this.addNew3()
        }
        if(newSec.time.sec === 5){
            return this.stop()
        }


        this.setState(newSec);
    };


    PushTrain = (index)=>{

        let newState = Object.assign({}, this.state);
        newState.lessons[index].visible = !newState.lessons[index].visible;
        this.setState(newState);
    };




    finish = () => {
        alert ("Добавлено");
    };

    renderCurrentEx = () => {
        let oneExTime = 30 / 4;
        let currentEx = Math.ceil(this.timer / oneExTime) - 1;
        return (
            <div>
                <input type="checkbox"/>
                {this.state.lessons[currentEx]}
            </div>
        )
    }

    render (){
        return(
            <div>
                <div className="draw">
                    <Timer/>
                    <h3>Lets GO</h3>
                    {this.state.lessons.map((post,index)=>{
                        return <div className={this.state.lessons[index]}>
                            <input onClick={()=>{this.PushTrain(index)}} type="radio"/>{post.name}</div>
                    })}
                    <p>начало тренировки</p>

                    {this.renderCurrentEx()}


                    <p>{this.state.time.sec} : sec</p>
                    <button onClick={()=>
                    {this.count = setInterval(() => this.timer(), 1000)}}
                    >Start</button>
                    <button onClick={()=>
                    {clearInterval(this.count)}, ()=>{this.finish()}}
                    >Закончить</button>
                </div>
            </div>
        )
    }
}


export default Check;