import React, {Component} from "react";
import styled from "styled-components";
import {getUsers} from "./store";
import {TextInput, Button} from "../ui";
import {connect} from 'react-redux';
import RenderIf from "../general/RenderIf";


const Container = styled.div`
    width: 200px;
    background-color: #ddfff8;
    font-size: 24px;
    font-weight: bold;
    padding:20px;
    margin: 20px auto;
`;

const User = ({name, points, onDelete}) => (
    <Container>
        Name: {name},
        <br/>
        Points: {points}
        <Button onClick={onDelete}>Удалить</Button>
    </Container>
);

class UsersList extends Component{

    state = {
        name: '',
        points: ''
    }

    componentWillMount(){
        getUsers();
    }

    changeInput(field, e){
        const value = e.target.value;
        this.setState({
            [field]: value
        })
    }

    deleteClick(id){
        fetch(`https://test-users-api.herokuapp.com/users/${id}`, {
            method: 'DELETE'})
        .then(res => res.json())
        .then((data) => {
            this.props.deleteUser(id);
        })
    }

    clickHandler = () => {
        let {name, points} = this.state;
        fetch('https://test-users-api.herokuapp.com/users', {
            method: 'POST',
            body: JSON.stringify({ name, age: points}),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        }).then((res) => res.json())
        .then((data) => {
            this.props.addNewUser({
                name: data.data.name,
                age: data.data.age,
                id: data.data._id
            })
            this.setState({
                error: false
            })
        })
        .catch(() => {
            this.setState({
                error: true
            })
        })
    }

    render(){
        return (
            <div>
                <RenderIf condition={this.state.error}>Error</RenderIf>
                <div>
                    <TextInput value={this.state.name}
                               onChange={this.changeInput.bind(this, 'name')}/>
                    <TextInput value={this.state.points}
                               onChange={this.changeInput.bind(this, 'points')}
                    />
                    <Button onClick={this.clickHandler} >Create</Button>
                </div>
                <div>
                    {this.props.users && this.props.users.map((user) => {
                        return <User key={user.id}
                                     name={user.name}
                                     points={user.age}
                                     onDelete={this.deleteClick.bind(this, user.id)}
                        />
                    })}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users: [...state.users].reverse()
    }
};

const dispatchToProps = (dispatch) => {
    return {
        addNewUser(user) {
            dispatch({
                type: "ADD_NEW_USER",
                ...user
            })
        },
        deleteUser(id) {
            dispatch({
                type: "DELETE_USER",
                id
            })
        }
    }
};

export default connect(mapStateToProps, dispatchToProps)(UsersList);
