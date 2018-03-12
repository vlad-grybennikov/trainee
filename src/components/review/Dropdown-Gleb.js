import React, {Component} from 'react';
import List from './List';

const CLOSED_CLASS = 'dropdown__list-closed';

const BLOCK = 'dropdown';
const BEMClass = (element) => `${BLOCK}__${element}--${modificator}`;


const trainersList = ['Тренер 1', 'Тренер 2', 'Тренер 3', 'Тренер 4'];

class ChangeTrainer extends Component{
    render(){
        <Dropdown items={trainersList} />
    }
}

export const List = (props) => {
    console.log(props);
    return (
        <div className='dropdown__item' onClick={props.applyTrainer}>{props.name}</div>
    )
};


class Dropdown extends Component {
    static Option = List // <Dropdown.Option />
    constructor(props){
        super(props);

        this.state = {
            closed: true,

            // Вынести из стейта
            title: 'Выбор тренера',
            placeholder: 'Выберите тренера',
            item: ['Тренер 1', 'Тренер 2', 'Тренер 3', 'Тренер 4'],
            // Вынести из стейта

            message: '',
            value: ''
        };
    }

    toggle = () => {
        this.setState((prevState) => {
            return {
                closed: !prevState.closed
            }
        })
    };

    applyTrainer = (index, event) => {
        this.setState({
            closed: true,
            value: this.props.items[index]
        });
    };

    showMsg = (e) => {
        console.log(e.target);
        this.setState({
            message: 'Тренер успешно добавлен.'
        });
    };

    render(){
        return(
            <div className='container'>
                <h2 className='title'>{this.state.title}</h2>
                <div className='dropdown'>
                    <div onClick={this.toggle} className={BEMClass("main")}>
                        {this.state.placeholder}
                    </div>
                    <div className={this.state.closed ? CLOSED_CLASS : ''}>
                        {this.state.item.map((item, index) => {
                            return <List applyTrainer={this.applyTrainer.bind(index)} key={index} name={item}></List>
                        })}
                    </div>
                </div>
                <button className='btn' onClick={this.showMsg}>Добавить</button>
                <div className='message'>{this.state.message}</div>
            </div>
        )

    }
}

export default Dropdown;