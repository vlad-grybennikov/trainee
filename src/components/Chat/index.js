import React, {Component} from "react";
import PropTypes from "prop-types";
import styled from 'styled-components';
import RenderIf from '../general/RenderIf';
import Chatting from "./Chatting";

import store from "./store";
import {Provider} from "react-redux";

const Cover = styled.div`
    position: fixed;
    z-index:100;
    width:250px;
    max-height:500px;
    right: 0;
    bottom:0;
    background-color: #333;
    color: #fff;
    font-family: Montserrat;
    font-weight:300;
    padding: 10px 20px;
`;


export default class Chat extends Component{
    state = {
        name: "Chat",
        opened: false
    }

    toggleChat = (e) => {
        if(e.target === this.chatCover) {
            this.setState((prevState) => {
                return {
                    opened: !prevState.opened
                }
            })
        }
    }

    render(){
        return (
            <Provider store={store}>
                <Cover onClick={this.toggleChat}
                       innerRef={(node)=> {
                            this.chatCover = node;
                }}>
                    {this.state.name}
                    <RenderIf condition={this.state.opened}>
                        <Chatting />
                    </RenderIf>
                </Cover>
            </Provider>
        )

    }
}