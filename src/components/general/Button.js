import React, {Component} from 'react';
import PropTypes from "prop-types";
import {excludeProp} from "../../utils";
import './Button.css';


const Button = (props) => {

    return (
        <button
            {...excludeProp(props, "children", "className")}
            className={`button
            ${props.className ? props.className : ''}`}>
            {props.children}
        </button>
    )


}

Button.propTypes = {
    onClick: PropTypes.func
}

export default Button