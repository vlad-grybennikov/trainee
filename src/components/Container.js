import React, { Component } from 'react';
import {Link, NavLink} from 'react-router-dom';
import {Header, Arrow, Title, CloseIcon} from "./ui";
import styled from 'styled-components';
import RenderIf from './general/RenderIf'

const Burger = styled.div`
    border: 4px solid #333;
    width: 30px;
    height: 15px;
    border-left: none;
    position: relative;
    border-right: none;
    &::after {
        content: "";
        width: 30px;
        height: 4px;
        background-color: #333;
        position:absolute;
        top: 50%;
        transform: translate(0, -50%);
    }
`;

const MenuWrapper = styled.div`
    position: fixed;
    z-index: 100;
    height: 100vh;
    width:100vw;
    top:0;
    left:0;
    background-image: linear-gradient( -75deg, rgb(222,255,201) 0%, rgb(163,248,255) 100%);
    color: #000;
    display: flex;
    flex-direction: column;
`;

const MenuItem = styled(NavLink)`
    text-transform: uppercase;
    color: #000;
    font-size: 24px;
    display: block;
    margin-bottom: 30px;
    font-weight: bold;
    text-decoration: none;
    letter-spacing: 0.14em;
`;
const Logout = styled(Link)`
    text-transform: uppercase;
    color: #000;
    margin-top:70px;
    display: block;
    text-decoration: none;
`;

const MenuItemWrapper = styled.div`
    margin: auto 0;
    text-align:center;
`

// Компонент который рисует меню
class Menu extends Component {
    state ={
        visible: false
    }
    menuOpen = () => {
        this.setState({
            visible: true
        })
    }
    menuClose = () => {
        this.setState({
            visible: false
        })
    }
    render(){
        return (
            <div>
                <RenderIf condition={this.state.visible}>
                    <MenuWrapper>

                        <Header>
                            <CloseIcon onClick={this.menuClose}/>
                            <Title>Menu</Title>
                        </Header>
                        <MenuItemWrapper>
                            <MenuItem to="/home/">home</MenuItem>
                            <MenuItem to="/daily/">daily</MenuItem>
                            <MenuItem to="/statistics/">statistics</MenuItem>
                            <MenuItem to="/settings/">settings</MenuItem>
                            <Logout to="/logout/">logout</Logout>
                        </MenuItemWrapper>
                    </MenuWrapper>
                </RenderIf>
                <Burger onClick={this.menuOpen} />
            </div>

        )
    }
};





const Wrapper = styled.div`
        background-color: #dedede;
        height: 100vh;
        font-family: Montserrat, sans-serif;
        padding: 30px 20px;
        overflow: auto;
`


// Обертка для компонентов в которых нужно меню
const Container = (Component, title) => {
    let WrappedComponent = (props) => {
        return (
            <Wrapper>
                <Header>
                    <Arrow />
                    <Title>
                        {title}
                    </Title>
                    <Menu />
                </Header>
                <Component {...props} />
            </Wrapper>
        )
    };
    // Должны вернуть функцию, чтобы можно было передать в
    // Route -> component
    return WrappedComponent;
}

Container(Wrapper, "title");

export default Container;
