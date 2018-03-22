import React, {Component} from "react";
import PropTypes from "prop-types";
import styled from 'styled-components';
import {TextInput, Button} from '../ui';


const data = [{
    name: 'Author',
    image: '../../assets/img/bg-login.jpg',
    message: 'Quickly! Nigga!',
    sender: false
}, {
    name: 'Author',
    image: '../../assets/img/bg-login.jpg',
    message: 'Where is my internet?',
    sender: true
}, {
    name: 'Author',
    image: '../../assets/img/bg-login.jpg',
    message: "Hello! I'll looking it...",
    sender: false
}];

const Container = styled.div`
    background-color: #fafafa;
    height: 400px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const MessageWrapper = styled.div`
    padding: 1px 0;
`;

const MessageTemplate = styled.div`
    font-size: 12px;
    color: #555;
    font-family: Chivo;
    display: flex;
    align-items: center;
    margin: 20px 0;
    width: 85%;
    box-sizing: border-box;
    border-radius: 20px;
    padding: 5px 10px;
    margin-left: ${props => props.sender ? '5px' : 'auto'}
    margin-right: ${props => props.sender ? 'auto' : '5px' }
    flex-direction: ${props => props.sender ? 'row' : 'row-reverse'}};
    background-color: ${props => props.sender ? '#aff9f5' : '#eee' };

`;

const AuthorImage = styled.img`
    border-radius: 100%;
    width: 30px;
    height:30px;
    margin-right: 5px;
    margin-left: 5px;
`
const Message = ({image, message, sender}) => {
    return (
        <MessageTemplate sender={sender}>
            <AuthorImage src={image} />
            {message}
        </MessageTemplate>
    )
}

const SendMessage = styled.div`
    display:flex;
`;
const InputMessage = styled(TextInput)`
    height:30px;
    border:1px solid #333;
    box-sizing: border-box;
    margin-bottom: 0;
    &::before{
        content: initial;
        width: 0;
    }
    & input{
        padding-left: 10px;
    }
`;
const ChatButton = styled(Button)`
    height: 30px;
    width:80px;
    padding:5px;
    text-align:center;
`;

export default class Chatting extends Component{
    state = {
        data: data,
        name: 'Author',
        image: '../../assets/img/bg-login.jpg'
    }

    addMessage = () => {
        this.setState((prevState) => {
            prevState.data.push({
                name: prevState.name,
                image: prevState.image,
                message: prevState.message,
                sender: true
            })
            return {
                data: prevState.data,
                message: ''
            }
        })
    }

    changeMessage = (e) => {
        this.setState({
            message: e.target.value
        })
    }

    enterHandler = (e) => {
        if(e.charCode === 13) {
            this.addMessage();
        }

    }
    render(){
        return (
            <Container>
                <MessageWrapper>
                    {
                        this.state.data.map((message, index) => {
                            return <Message {...message} key={index} />
                        })
                    }
                </MessageWrapper>
                <SendMessage>
                    <InputMessage value={this.state.message}
                                  onChange={this.changeMessage}
                                  onKeyPress={this.enterHandler}
                    />
                    <ChatButton onClick={this.addMessage}>Send</ChatButton>
                </SendMessage>
            </Container>
        )
    }
}


