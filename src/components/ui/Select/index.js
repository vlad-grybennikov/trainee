import React, {Component} from 'react';
import PropTypes from "prop-types";
import RenderIf from "../../general/RenderIf"
import Option from "./Option";
import styled from 'styled-components';
import {Icon} from "../";
import UsernameIcon from '../../../assets/icons/icon-username.svg';

const Container = styled.div`
    position: relative;
     font-size: 13px;
    font-family: Chivo, sans-serif;
`;
const SelectBox = styled.div``;
const SelectValue = styled.div`
    letter-spacing: 0.04em;
    width: 100%;
    height: 60px;
    border: none;
    margin-bottom: 5px;
    max-width: 480px;
    background-color: #ffffff;
    font-family: Chivo, sans-serif;
    display: flex;
    align-items: center;
    padding: 0 10px;
    box-sizing: border-box;
`;

const SelectValueItem = styled.div`
    margin: 0 auto;
    text-align: left;
    width: 100%;
    color: #333;
    padding: 0 9px;
`;

const OptionContainer = styled.div`
    display: ${props => props.visible ? 'block' : 'none'};
    position: absolute;
    width: 80%;
    top: 50px;
    left: 50%;
    transform: translate(-50%, 0);
    color: #333;
`;

class Select extends Component{

    // Нужно для того чтобы вызывать как <Select.Option />
    static Option = Option

    static propTypes = {
        selectedIndex: PropTypes.number,
        className: PropTypes.string,
        placeholder: PropTypes.string,
        children: PropTypes.arrayOf(PropTypes.instanceOf(Option)).isRequired,
        searchable: PropTypes.bool
    }

    static defaultProps = {
        selectedIndex: null
    }
    state = {
        selectedIndex: this.props.selectedIndex,
        visible: false
    }

    toggleVisible = () => {

        // Меняем предыдущий стейт на обратный
        this.setState((prevState) => {
            return {
                visible:!prevState.visible
            }
        })

    }

    chooseOption = (index) => {
        this.setState({
            selectedIndex: index,
            visible: false
        });
    }

    render(){
        return (
            <Container>
                {/*Проверка на наличие класса и если есть добавляем*/}


                <SelectBox onClick={this.toggleVisible}>
                    <SelectValue>
                        <Icon src={UsernameIcon}/>


                                {/* Условный рендеринг, см. RenderIf */}
                            <RenderIf condition={
                                this.state.selectedIndex === null
                             }>
                                <SelectValueItem>{this.props.placeholder}</SelectValueItem>
                            </RenderIf>


                            <RenderIf condition={
                                    this.state.selectedIndex !== null
                                }>
                                <SelectValueItem>
                                    {this.state.selectedIndex !== null ?
                                        this.props.children[this.state.selectedIndex]
                                            .props.children :
                                        ''
                                    }
                                </SelectValueItem>
                            </RenderIf>


                    <Icon src={UsernameIcon}/>
                </SelectValue>
                    {/* Условный рендеринг, см. RenderIf */}

            </SelectBox>

                {/*Рендерим Options нашего селекта, если state.visible == true*/}
                <OptionContainer visible={this.state.visible}>
                    {this.props.children.map((children, index) => {
                        return (
                            <div onClick={this.chooseOption.bind(this, index)}>
                                {children}
                            </div>
                        )
                    })}
                </OptionContainer>
                {/*Рендерим Options нашего селекта, если state.visible == true*/}

            </Container>
        )
    }
}

export default Select;