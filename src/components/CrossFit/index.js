import  React, {Component} from "react";
import  RangeSlider from "./RangeSlider";
import  WorkoutProcess from  "./WorkoutProcess";
import RenderIf from "../general/RenderIf";
import Button from "../general/Button";
import Timer from "../Timer"
import CardExercise from "./CardExercise";
import './index.css';


const exerciseList = [{
    image:'https://i.ytimg.com/vi/_l3ySVKYVJ8/maxresdefault.jpg',
    description:'push ups'
                        },
    {
        image:'https://www.womenshealthmag.com/sites/womenshealthmag.com/files/styles/listicle_slide_custom_user_phone_1x/public/images/slide2-bweight-squat.jpg',
        description:'squats'
    },
    {
        image:'https://i.ytimg.com/vi/_l3ySVKYVJ8/maxresdefault.jpg',
        description:'push ups'
    },
    {
        image:'https://www.nerdfitness.com/wp-content/uploads/2009/07/wrk_pullups-202x300.jpg',
        description:'pull ups'
    },
    {
        image:'https://cdn-mf0.heartyhosting.com/sites/mensfitness.com/files/styles/wide_videos/public/rookie-mistake-deadlift_0.jpg',
        description:'deadlift'
    }]
export default class CrossFit extends Component{
    constructor(props){
        super(props);
        this.time = 30;
        this.state = {
            minutes: Math.floor(this.time / 60),
            seconds: this.time % 60,
            ccal: 0,
            inProcess: false,
            card: {
                image:'https://i.ytimg.com/vi/_l3ySVKYVJ8/maxresdefault.jpg',
                description:'push ups'
            }

        }
    }

    recaclucateTime(){
        this.setState({
            minutes: Math.floor(this.time / 60),
            seconds: this.time % 60
        });
    }

    startProcess = () => {
        this.setState({
            inProcess: true,
        })
    }

    processEnd = () => {
        this.setState({
            inProcess: false,
        })
    }

    changeExercise = (minutes, seconds) => {
        let oneExTime = this.time/exerciseList.length;
        let currentEx = Math.ceil(minutes * 60 + seconds / oneExTime) - 1;
        if(currentEx >= 0){
            this.setState({
                card: exerciseList[currentEx],
            })
        };
        this.setState({
            minutes,
            seconds
        })

    }

    render(){
        return(
            <div>

                <RenderIf condition={this.state.inProcess}>
                        <div>
                            <Timer onTimerChange={this.changeExercise}
                                   onTimerEnd={this.processEnd}
                                   minutes={this.state.minutes}
                                   seconds={this.state.seconds}
                                   reverse
                            />
                            <CardExercise image={this.state.card.image}>
                                {this.state.card.description}
                            </CardExercise>
                        </div>
                </RenderIf>

                <RenderIf condition={!this.state.inProcess}>
                    <div>

                        <h3>{this.state.ccal}</h3>

                        <Button className="btn-start" onClick={this.startProcess}><b>start</b></Button>

                    </div>

                </RenderIf>


            </div>
        )
    }

}

