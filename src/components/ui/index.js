import React, {Component} from 'react';
import styled from 'styled-components';
import {excludeProp} from "../../utils";
import {withRouter} from "react-router-dom";

export const Button = styled.button`
    background-image: -moz-linear-gradient( -10deg, rgb(222,255,201) 0%, rgb(163,248,255) 100%);
    background-image: -webkit-linear-gradient( -10deg, rgb(222,255,201) 0%, rgb(163,248,255) 100%);
    background-image: -ms-linear-gradient( -10deg, rgb(222,255,201) 0%, rgb(163,248,255) 100%);
    height: 50px;
    width: 100%;
    max-width: ${props => props.size === 'small' ? '300px' : '480px'};
    text-transform:uppercase;
    border: none;
    font-family: inherit;
    font-size: 11px;
    font-weight: bold;
    letter-spacing: 0.14em;
    color: #999;
`;

export const Icon = styled.img`
    width: 20px;
    height: 20px;
    margin: 5px;
    padding: 0;
`;

const InputWrapper = styled.div`
    margin-bottom: 5px;
    width: 100%;
    height: 60px;
    max-width: 480px;
    background-color: #ffffff;
    font-family: Chivo, sans-serif;
    display: flex;
    &::before {
      width: 60px;
      content: '';
      background-image: url(${props => props.image ? props.image : ''});
      background-repeat: no-repeat;
      background-size: 20px;
      background-position: center;
    }
`;
const Input = styled.input`
    letter-spacing: 0.04em;
    height: 100%;
    width: 100%;
    border: none;
    &:focus{
      outline: none;
    }
    &::placeholder{
      color: #333
      opacity: 1;
    }
`;
export const TextInput = (props) => {
    return (
        <InputWrapper image={props.image} {...excludeProp(props, 'image', 'value')}>
            <Input value={props.value || ''}/>
        </InputWrapper>
    )
}

export const ErrorMessage = styled.div`
    display: ${props => props.visible ? 'block' : 'none'}
    background-color: #fff
    text-align: center
    font-family:Chivo;
    font-weight: bold;
    color: #f00;
    text-transform:uppercase;
`;

export const Title = styled.h4`
    margin: 0 auto;
`
export const Header = styled.header`
        display: flex;
        margin-bottom: 20px;
`

export const Arrow = styled.div`
        transform: rotate(-45deg);
        border: 4px solid ${props => props.theme === 'light'? '#fff' : '#000'};
        width: 12px;
        height: 12px;
        border-right: none;
        border-bottom: none;
        box-sizing: border-box;

 `
const BackArrowLocal = (props) =>  {
    return <Arrow {...props} onClick={props.history.goBack} />
};

export const BackArrow = withRouter(BackArrowLocal);

const defaultSize = 20;
const diagonal = (size = defaultSize) => {
    return size * Math.sqrt(2)
};


export const CloseIcon = styled.div`
        width: ${props => props.size ? props.size : defaultSize}px;
        height: ${props => props.size ? props.size : defaultSize}px;
        position: relative;
        &::before, &::after {
            height: 4px;
            content: "";
            width:${props => props.size ? diagonal(props.size) : diagonal()}px;
            background-color: ${props => props.theme === 'light'? '#fff' : '#000'};
            display: block;
            trasnform-origin: center;
            position: absolute;
            top: 10px;
            left: 50%;
        }
        &::before{
            transform: rotate(-45deg) translate(-50%, -50%);
        }
        &::after{
            transform: rotate(45deg) translate(-50%, -50%);
            top: 150%;
        }
`;
