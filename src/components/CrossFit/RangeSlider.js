import  React, {Component} from "react";
import PropTypes from "prop-types";
import "./RangeSlider.css";

const offsetAbs = (element, startOffset = 0) => {

    // Рекурсивно складывает offset до элемента
    let offset = startOffset;
    offset += element.offsetLeft;
    if(element.offsetParent !== null){
        return offsetAbs(element.offsetParent, offset);
    }
    return offset;
}

export default class RangeSlider extends Component{
    static propTypes = {
        min: PropTypes.number.isRequired,
        max: PropTypes.number.isRequired,
        onChange: PropTypes.func
    }
    static defaultProps = {
        min: 0,
        onChange: ()=>{}
    }

    state = {
        rangeWidth: 0,
        canMove: false,
        value: this.props.min
    }

    changeValue = (e) => {
        let value = parseInt(e.target.value, 10);
        if(value > this.props.max) {
            return false;
        }

        this.setState({
            value,
            rangeWidth: (value - this.props.min) /
                        (this.props.max - this.props.min)
        })
    }

    countValue = (clientX) => {

        // Расчет положения бегунка
        let start = this.props.min,
            end = this.props.max,
            deltaX = clientX - offsetAbs(this.rangeBar),
            shiftWidth = deltaX / this.rangeBar.clientWidth;
        if(deltaX <  0 || deltaX > this.rangeBar.clientWidth) {
            return false;
        }
        let value = Math.round((end - start) * shiftWidth + start);
        // Расчет положения бегунка


        this.setState({
            rangeWidth: shiftWidth,

            // аналог: value: value
            value

        }, () => {
            // Функция сработает после рендеринга
            this.props.onChange(value)
        })
    }

    clickHandler = (e) => {

        // Если клик был по бегунку, то не пересчитываем значение
        if(e.target !== this.rangePointer){

            // Передаем значение координаты стрелки
            this.countValue(e.clientX);
        }
    }

    moveHandler = (e) => {
        if(this.state.canMove){

            // Передаем значение координаты стрелки
            this.countValue(e.clientX);
        } else {
            return false;
        }
    }

    allowMove = () => {
        this.setState({
            canMove: true
        })
    }

    deniedMove = () => {
        this.setState({
            canMove: false
        })
    }

    render(){
        return (
            <div className="range__wrapper"
                 onMouseMove={this.moveHandler}
                 onMouseLeave={this.deniedMove}>
                <span className="range__min">{this.props.min}</span>
                    <div className="range__bar" ref={(node) => {

                        this.rangeBar = node;
                    }} onClick={this.clickHandler}
                    >
                        <div className="range__value" style={{
                            width: this.state.rangeWidth * 100 + "%"
                        }}></div>
                        <div className="range__pointer" ref={(node) => {
                             this.rangePointer = node;
                        }} style={{
                            left: this.state.rangeWidth * 100 + "%"
                        }}
                        onMouseDown={this.allowMove}
                             onMouseUp={this.deniedMove}
                        ></div>
                    </div>
                <span className="range__max">{this.props.max}</span>
                <input type="number" value={this.state.value}
                onChange={this.changeValue} />
            </div>
        )
    }
}