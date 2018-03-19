import React, { Component } from 'react';
import {Button, TextInput} from "../ui";
import {withRouter} from "react-router-dom";
import {getLogged} from "../../utils";
import styled from 'styled-components';
import UsernameIcon from '../../assets/icons/icon-username.svg'
import PasswordIcon from '../../assets/icons/icon-password.svg'

const Logo = styled.h1`
    font-size: 120px;
    text-align: right;
    line-height: 1;
    font-weight: normal;
`;

const SubLogo = styled(Logo)`
    font-size: 40px;
`;

const Container = styled.div`
    width: 100%;
    min-height: 100vh;
    background-image: url("../../assets/img/bg-login.jpg");
    background-size: cover;
    color: #fff;
    padding: 20px 30px;
    box-sizing: border-box;
    font-family: Montserrat, sans-serif;
`;

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
        <Container>
            <Logo>TNR</Logo>
            <SubLogo>APP</SubLogo>
            <TextInput onChange={this.onChange.bind(this, 'login')}
                   value={this.state.login} placeholder="login"
                   type="text"
                       image={UsernameIcon}
            />

            <TextInput onChange={this.onChange.bind(this, 'password')}
                   value={this.state.password}
                       image={PasswordIcon}
                   placeholder="password" type="password"/>

            <Button type="button"
                    onClick={this.onLogin}>
                get started
            </Button>

        </Container>
        )
    }

}

// Оборачиваем в withRouter, чтобы получить доступ
// к this.props.history, нужен для редиректа
export default withRouter(Login);
