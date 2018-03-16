import React, {Component} from 'react';
import PropTypes from "prop-types";
import RenderIf from "../general/RenderIf"
import Option from "./Option";
import "./index.css"


class Select extends Component{

    // Нужно для того чтобы вызывать как <Select.Option />
    static Option = Option

    static propTypes = {
        selectedIndex: PropTypes.number,
        className: PropTypes.string,
        placeholder: PropTypes.string,
        children: PropTypes.arrayOf(PropTypes.instanceOf(Option)).isRequired,
        searchable: PropTypes.bool
    }
    static defaultProps = {
        selectedIndex: 0,
    }

    state = {
        selectedIndex: this.props.selectedIndex,
        visible: false
    }

    toggleVisible = () => {

        // Меняем предыдущий стейт на обратный
        this.setState((prevState) => {
            return {
                visible:!prevState.visible
            }
        })

    }

    chooseOption = (index) => {
        this.setState({
            selectedIndex: index,
            visible: false
        });
    }

    render(){
        return (
            <div className={`select__wrapper
            ${this.props.className ? this.props.className : ''}`}>
                {/*Проверка на наличие класса и если есть добавляем*/}


                <div className="select" onClick={this.toggleVisible}>


                    {/* Условный рендеринг, см. RenderIf */}
                <RenderIf condition={
                    typeof this.state.selectedIndex === 'undefined'
                 }>
                    <span>{this.props.placeholder}</span>
                </RenderIf>
                <RenderIf condition={
                        this.state.selectedIndex !== 'undefined'
                    }>
                    <span className="select__value">
                        {this.props.children[this.state.selectedIndex]
                            .props.children}
                    </span>
                </RenderIf>
                    {/* Условный рендеринг, см. RenderIf */}

            </div>

                {/*Рендерим Options нашего селекта, если state.visible == true*/}
                <div className={`select__options ${this.state.visible ? "select__options--visible" : ""}`} >
                    {this.props.children.map((children, index) => {
                        return (
                            <div onClick={this.chooseOption.bind(this, index)}>
                                {children}
                            </div>
                        )
                    })}
                </div>
                {/*Рендерим Options нашего селекта, если state.visible == true*/}

            </div>
        )
    }
}

export default Select;