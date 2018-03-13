import React, {Component} from 'react';
import PropTypes from "prop-types";
import RenderIf from "../general/RenderIf"
import "./index.css"

const Option = (props) => {
    return (
        <div className="select__option"
             onClick={props.onClick}
        >{props.children}</div>
    )
};

Option.propTypes = {
    onClick: PropTypes.func.isRequired
};

class Select extends Component{
    static Option = Option
    static propTypes = {
        selectedIndex: PropTypes.number,
        className: PropTypes.string,
        placeholder: PropTypes.string,
        children: PropTypes.arrayOf(PropTypes.instanceOf(Option)).isRequired
    }
    state = {
        selectedIndex: this.props.selectedIndex,
        visible:false
    }
    toggleOption = () => {
        this.setState((prevState)=>{
            return {visible:!prevState.visible}
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
                <div className="select" onClick={this.toggleOption}>

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
            </div>
                <div className={`select__options ${this.state.visible ? "select__options--visible" : ""}`} >
                    {this.props.children.map((children, index) => {
                        return (
                            <div onClick={this.chooseOption.bind(this, index)}>
                                {children}
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default Select;