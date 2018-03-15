import React, {Component} from 'react';
import PropTypes from "prop-types";
import './Button.css';


const Button = (props) => {
    return (
        <button className={`button
            ${props.className ? props.className : ''}`} onClick={props.onClick}>
            {props.children}
        </button>
    )


}

Button.propTypes = {
    onClick: PropTypes.func
}

export default Button