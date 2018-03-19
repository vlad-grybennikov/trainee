import React, {Component} from 'react';
import styled from 'styled-components';
import {excludeProp} from "../../utils";

export const Button = styled.button`
    background-image: -moz-linear-gradient( -10deg, rgb(222,255,201) 0%, rgb(163,248,255) 100%);
    background-image: -webkit-linear-gradient( -10deg, rgb(222,255,201) 0%, rgb(163,248,255) 100%);
    background-image: -ms-linear-gradient( -10deg, rgb(222,255,201) 0%, rgb(163,248,255) 100%);
    height: 50px;
    width: 100%;
    max-width: 480px;
    text-transform:uppercase;
    border: none;
    font-family: inherit;
    font-size: 11px;
    font-weight: bold;
    letter-spacing: 0.14em;
`;

const InputWrapper = styled.div`
    width: 100%;
    height: 60px;
    max-width: 480px;
    background-color: #ffffff;
    font-family: Chivo;
    display: flex;
    &::before{
      width: 60px;
      content: '';
      background-image: url(${props => props.image ? props.image : ''});
    }
`;
const Input = styled.input`
    height: 100%;
    width: 100%;
    border: none;
    &:focus{
      outline: none;
    }
`;
export const TextInput = (props) => {
    return (
        <InputWrapper image={props.image}>
            <Input {...excludeProp(props, 'image')}/>
        </InputWrapper>
    )
}
