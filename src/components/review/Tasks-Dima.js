import React, {Component} from 'react';
const Tasks = (props) => {
    return (
        <div className="task" onClick={props.onChange}>
            <input checked={props.checked}
                   type="checkbox"
                   name={props.name}
                   disabled={props.disabled}
            />
            <label className={`${props.checked ? 'done' : '' }`}>
                {props.value}
            </label>
        </div>
    )
}
Tasks.propTypes = {

}

export default Tasks;