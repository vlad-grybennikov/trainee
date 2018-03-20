import React, { Component } from 'react';
import {Button, TextInput, ErrorMessage , Header, BackArrow, Title}
    from "../ui";
import Select from "../ui/Select";
import {withRouter, Link} from "react-router-dom";
import {getLogged} from "../../utils";
import styled from 'styled-components';
import UsernameIcon from '../../assets/icons/icon-username.svg';
import PasswordIcon from '../../assets/icons/icon-password.svg';
//import SmileIcon from '../../assets/icons/icon-smile.svg';
//import EmailIcon from '../../assets/icons/icon-email.svg';
//import MoreIcon from '../../assets/icons/icon-more.svg';


const media = {
    desktop: (styles) => {
        return `@media screen and (min-width: 1024px){
            ${styles}
        }`
    }
}

const Logo = styled.h1`
    font-size: 120px;
    text-align: right;
    line-height: 1;
    font-weight: normal;
`;

const SubLogo = styled(Logo)`
    font-size: 40px;
`;

const Wrapper = styled.div`
    display:flex;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
    background-image: url("../../assets/img/bg-login.jpg");
    background-size: cover;
    color: #fff;
    padding: 20px 45px;
    box-sizing: border-box;
    font-family: Montserrat, sans-serif;
    ${media.desktop(`
        color: pink;
    `)}
`;
const ButtonStart = styled(Button)`
    margin: 25px auto 50px

`
const InputCenter = styled.div`
    margin-top: auto;
`
const LinkContainer = styled.div`
    display: flex;
    justify-content: space-between;
`
const StyledLink = styled(Link)`
    color: grey;
    text-decoration: none;
    font-size: 11px;
`


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
        password: '',
        visible: false
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
        if (this.state.login.length < 1 || this.state.password.length < 1) {
            this.setState({
                visible: true
            })
        } else {
            localStorage.setItem('logged', true);

            // Редирект
            this.props.history.push("/home");
        }
    }

    render(){
        return (
        <Wrapper>
            <Logo>TNR</Logo>
            <SubLogo>APP</SubLogo>
            <InputCenter>
                <ErrorMessage visible={this.state.visible}>Incorrect Login</ErrorMessage>
                <TextInput onChange={this.onChange.bind(this, 'login')}
                       value={this.state.login} placeholder="login"
                       type="text"
                           image={UsernameIcon}
                />

                <TextInput onChange={this.onChange.bind(this, 'password')}
                       value={this.state.password}
                           image={PasswordIcon}
                       placeholder="password" type="password"/>

                <ButtonStart type="button"
                        onClick={this.onLogin}>
                    get started
                </ButtonStart>
                <LinkContainer>
                    <StyledLink to="/signup">Create Account</StyledLink>
                    <StyledLink to="/">Need help?</StyledLink>
                </LinkContainer>
            </InputCenter>
        </Wrapper>
        )
    }

}

export class SignupLocal extends Component {
    render(){
        return(
            <Wrapper>
                <Header>
                    <BackArrow theme="light"/>
                    <Title theme="light">
                        Create Account
                    </Title>
                </Header>
                <InputCenter>
                    <Select placeholder="Who are you?">
                        <Select.Option>Coach</Select.Option>
                        <Select.Option>Trainee</Select.Option>
                    </Select>

                    <TextInput image={UsernameIcon}
                               placeholder="Your name"
                               type="text" />

                    <TextInput
                               placeholder="Your email"
                               type="email" />

                    <TextInput image={PasswordIcon}
                               placeholder="Password"
                               type="password" />

                    <ButtonStart type="button"
                                 onClick={this.onLogin}>
                        get started
                    </ButtonStart>
                    <LinkContainer>
                        <StyledLink to="/login">Login</StyledLink>
                        <StyledLink to="/">Need help?</StyledLink>
                    </LinkContainer>
                </InputCenter>
            </Wrapper>
        )
    }
}

// Оборачиваем в withRouter, чтобы получить доступ
// к this.props.history, нужен для редиректа
export const Signup = withRouter(SignupLocal);
export default withRouter(Login);
