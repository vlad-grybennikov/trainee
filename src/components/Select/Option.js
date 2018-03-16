import React, {Component} from 'react';
import PropTypes from "prop-types";

const Option = (props) => {
    return (
        <div className="select__option"
             onClick={props.onClick}
        >{props.children}</div>
    )
};

Option.propTypes = {
    onClick: PropTypes.func.isRequired,
    children: PropTypes.any
};

Option.defaultProps = {
    onClick: () => {}
}

export default Option