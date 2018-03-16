import React, { Component } from 'react';
import Button from "../general/Button";
import {withRouter} from "react-router-dom";
import {getLogged} from "../../utils";

export const Logout = withRouter((props) => {
    localStorage.removeItem('logged');
    props.history.push("/login");
    return null;
});

class Login extends Component{
    constructor(props) {
        super(props);
        if(getLogged()) {
            this.props.history.push("/home");
        }
    }

    state = {
        login: '',
        password: ''
    }

    onChange = (inputName, event) => {
        let value = event.target.value;
        this.setState({
            [inputName]: value
        })
    };

    onLogin = () => {
        localStorage.setItem('logged', true);
        this.props.history.push("/home");
    }

    render(){
        return (
        <div>

            <input onChange={this.onChange.bind(this, 'login')} value={this.state.login} placeholder="login" type="text"/>

            <input onChange={this.onChange.bind(this, 'password')} value={this.state.password} placeholder="password" type="password"/>

            <Button type="button" className="custom-class" onClick={this.onLogin}>Reg</Button>

        </div>
        )
    }

}
export default withRouter(Login);
