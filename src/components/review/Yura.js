import React,{Component} from 'react';
import Logo from '../print/1.png';


const trainersList = ['Trainer 1', 'Trainer 2', 'Trainer 3'];
class AppLogic extends Component {
    constructor (props){
        super(props);
        this.state = {
            isOpened: false,
            value: 'Выбор тренера',
            trainersList
        };
    }
    togglState (){
        this.setState({isOpened: !this.state.isOpened});
    };
    testF(index){
        console.log(`Clicked! ${this.state.trainersList[index]}`);
        this.setState({
            value: this.state.trainersList[index]
        });

    }

    renderTrainersList(){
        if (this.state.isOpened){
                return (
                    <div>
                        {this.state.trainersList.map((trainer, index) => {
                            return (
                                <div onClick={this.testF.bind(this, index)}>{trainer}</div>
                            )
                        })}
                    </div>
                );
        } else {
            return null;
        }
    }

    render() {

        console.log('isPpened',this.state.isOpened);
        let text ;
        let test ;

        return <div className='mainApp'>
            <div className='logo'>
                <img src={Logo} alt="a" className='logoImg'/>
            </div>
            <h3 className='title'>Выбор тренера</h3>
            <div onClick={this.togglState.bind(this)} className='trainers'>
                {this.state.value}
                <div>
                    {this.renderTrainersList()}
                </div>
            </div>
        </div>
    }
}

export default AppLogic;