import React from "react";
import PropTypes from "prop-types";

const CardExercise = (props) => {
    return (
        <div>
            <img className="crossfit__image" src={props.image} alt={props.children}/>
            {props.children}

        </div>
    )
}
CardExercise.propTypes = {
    image: PropTypes.string

}

export default CardExercise;