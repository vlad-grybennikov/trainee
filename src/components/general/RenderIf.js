import React, {Component} from 'react';
import PropTypes from "prop-types";

export const RenderIf = (props) => {

    // Проверяем условие props.condition
    if(props.condition){

        // Рендерим то, что между тегами
        return props.children;
    } else {

        // Ничего не рендерим
        return null;
    }
}

RenderIf.propTypes = {
    condition: PropTypes.bool,
    children: PropTypes.any
}

export default RenderIf;