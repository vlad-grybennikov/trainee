import React, { Component } from 'react';
import Button from "../general/Button";
import {withRouter} from "react-router-dom";
import {getLogged} from "../../utils";


// Оборачиваем в withRouter, чтобы получить доступ
// к this.props.history, нужен для редиректа
export const Logout = withRouter((props) => {
    localStorage.removeItem('logged');

    // Редирект на /login
    props.history.push("/login");
    return null;
});

class Login extends Component{
    constructor(props) {
        super(props);

        // При создании компонента
        // Проверяем залогинен ли юзер, если да, то редиректим
        // Нужно, чтобы нельзя было зайти на /login/
        // Когда мы уже авторизированы
        if(getLogged()) {
            this.props.history.push("/home");
        }
    }

    state = {
        login: '',
        password: ''
    }

    onChange = (inputName, event) => {

        // Получили значения инпута
        let value = event.target.value;


        this.setState({
            // Аналог obj[inputName]
            // Вместо ключа используем переменную
            // Получаем через bind, когда привязываем к инпуту событие
            [inputName]: value
        })
    };

    onLogin = () => {
        localStorage.setItem('logged', true);

        // Редирект
        this.props.history.push("/home");
    }

    render(){
        return (
        <div>

            <input onChange={this.onChange.bind(this, 'login')}
                   value={this.state.login} placeholder="login"
                   type="text"/>

            <input onChange={this.onChange.bind(this, 'password')}
                   value={this.state.password}
                   placeholder="password" type="password"/>

            <Button type="button"
                    className="custom-class"
                    onClick={this.onLogin}>Reg</Button>

        </div>
        )
    }

}

// Оборачиваем в withRouter, чтобы получить доступ
// к this.props.history, нужен для редиректа
export default withRouter(Login);
