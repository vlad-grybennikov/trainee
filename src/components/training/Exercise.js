import  React from "react";

const Exercise = (props) => {
    return (
        <div onClick={props.doneExercise}>
            <input type="checkbox" checked={props.checked}/>
            <span className={props.checked? 'checked': ''}>{props.name}</span>
        </div>
    )
}
export default Exercise