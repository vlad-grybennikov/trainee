import React, { Component }  from 'react';
import styled from 'styled-components';
import {connect} from "react-redux";
//import {getExercises} from "./store";

const Delete = styled.div`
  width: 20px;
  height: 20px;
  background-color: #222222;
  display: inline-block;
  margin: 0 0 0 15px;
`;

const Exercise = (props) => {
    return (
        <div>
            <input type="checkbox" checked={props.checked}/>
            <span className={props.checked? 'checked': ''}>{props.name}</span>
            <Delete onClick={props.delete}/>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        exercises: state.exercises
    }
};

const dispatchToProps = (dispatch) => {
    return {
        addNewExercise(exercise) {
            dispatch({
                type: "ADD_NEW_EX",
                ...exercise
            })
        },
        changeExercise(checked){
            dispatch({
                type: 'UPDATE_EX',
                checked
            })
        },
        deleteExercise(name) {
            dispatch({
                type: "DELETE_EX",
                name
            })
        }
    }
};

class Exercises extends Component{
    deleteExercise = (name) => {
        this.props.deleteExercise(name);
    };

    toggle = () => {
        this.props.changeExercise();
    }

    render() {
        return (
            <div>
                {this.props.exercises.map((exercise, index) =>{
                        return <Exercise name={exercise.name}
                                         checked={exercise.checked}
                                         delete={this.deleteExercise.bind(this, exercise.name)}
                                         onChange={this.toggle.bind(this, exercise.checked)}
                        />
                    })}
            </div>
        )
    }
}

export default connect(mapStateToProps, dispatchToProps)(Exercises);