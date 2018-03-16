import React, {Component} from 'react';
import PropTypes from "prop-types";
import './Button.css';


const Button = (props) => {
    let copyProps = Object.assign({}, props);
    delete copyProps.className;
    delete copyProps.children;

    return (
        <button className={`button
            ${props.className ? props.className : ''}`}
            {...copyProps}>
            {props.children}
        </button>
    )


}

Button.propTypes = {
    onClick: PropTypes.func
}

export default Button